import { getCookie } from './utils';
import { handleApiError } from './toast';
import { Language, toLocale, parseLocale, getApiErrorMessage } from '@/lib/constants/language';

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
    const url = `${this.baseUrl}${endpoint}`;

    const token = getCookie('byligg_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
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
          message = errorData.message || getApiErrorMessage('sessionExpired', resolvedLang);
        } else if (statusCode === 403) {
          message = errorData.message || getApiErrorMessage('permissionDenied', resolvedLang);
        } else if (statusCode === 400) {
          message = errorData.message || getApiErrorMessage('invalidRequest', resolvedLang);
        }

        const error = new ApiError(statusCode, message);
        handleApiError(error, resolvedLang);
        throw error;
      }

      const data = (await response.json()) as unknown;

      if (data && typeof data === 'object') {
        const maybePayload = data as ApiResponse;
        if (typeof maybePayload.success === 'boolean' && !maybePayload.success) {
          const businessMessage = maybePayload.message || maybePayload.error || getApiErrorMessage('businessRuleError', resolvedLang);
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
      const networkError = new ApiError(0, getApiErrorMessage('networkError', resolvedLang));
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