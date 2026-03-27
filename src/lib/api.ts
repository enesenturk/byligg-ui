import { getCookie } from './utils';
import { handleApiError } from './toast';
import { Language, toLocale, parseLocale, getMessage } from '@/lib/constants/language';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    lang?: Language
  ): Promise<T> {
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.makeRequest<T>(endpoint, options, lang);
      } catch (error) {
        const isRetryableError = this.isRetryableError(error);
        const isLastAttempt = attempt === maxRetries;

        if (!isRetryableError || isLastAttempt) {
          throw error;
        }

        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // This should never be reached, but TypeScript requires it
    throw new Error('Unexpected retry logic error');
  }

  private isRetryableError(error: unknown): boolean {
    if (error instanceof ApiError) {
      // Retry on network errors (status 0) and server errors (5xx)
      return error.status === 0 || (error.status >= 500 && error.status < 600);
    }
    // Retry on network/fetch errors
    return error instanceof TypeError || error instanceof Error;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    lang?: Language
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const token = getCookie('byligg_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const resolvedLang: Language =
      lang ||
      (typeof window !== 'undefined'
        ? parseLocale((localStorage.getItem('lx-lang') as string | null) || 'tr')
        : 'tr');

    headers['Accept-Language'] = toLocale(resolvedLang);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as { message?: string };

        let message = errorData.message || `HTTP ${response.status}`;
        const statusCode = response.status;

        if (statusCode === 401 && typeof window !== 'undefined') {
          document.cookie = 'byligg_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          window.location.href = '/';
          message = errorData.message || getMessage('sessionExpired', resolvedLang);
        } else if (statusCode === 403) {
          message = errorData.message || getMessage('permissionDenied', resolvedLang);
        } else if (statusCode === 400) {
          message = errorData.message || getMessage('invalidRequest', resolvedLang);
        }

        const error = new ApiError(statusCode, message);
        handleApiError(error, resolvedLang);
        throw error;
      }

      const data = (await response.json()) as unknown;

      if (data && typeof data === 'object') {
        const maybePayload = data as ApiResponse;
        if (typeof maybePayload.success === 'boolean' && !maybePayload.success) {
          const businessMessage = maybePayload.message || maybePayload.error || getMessage('businessRuleError', resolvedLang);
          const businessError = new ApiError(400, businessMessage);
          handleApiError(businessError, resolvedLang);
          throw businessError;
        }
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      const networkError = new ApiError(0, getMessage('networkError', resolvedLang));
      handleApiError(networkError, resolvedLang);
      throw networkError;
    }
  }

  async get<T>(endpoint: string, lang?: Language): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, lang);
  }

  async post<T>(endpoint: string, data?: unknown, lang?: Language): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, lang);
  }

  async put<T>(endpoint: string, data?: unknown, lang?: Language): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, lang);
  }

  async delete<T>(endpoint: string, lang?: Language): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, lang);
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55002');