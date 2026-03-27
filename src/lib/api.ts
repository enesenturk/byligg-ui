import { getCookie } from './utils';
import { Language, toLocale, parseLocale, getMessage } from '@/lib/constants/language';

export const AUTH_TOKEN_COOKIE = 'byligg_token';

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

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler;
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
    const baseDelay = 1000;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.makeRequest<T>(endpoint, options, lang);
      } catch (error) {
        const isLastAttempt = attempt === maxRetries;
        if (!this.isRetryableError(error) || isLastAttempt) {
          throw error;
        }
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('Unexpected retry logic error');
  }

  private isRetryableError(error: unknown): boolean {
    if (error instanceof ApiError) {
      return error.status === 0 || (error.status >= 500 && error.status < 600);
    }
    return false;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    lang?: Language
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const token = getCookie(AUTH_TOKEN_COOKIE);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
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

        const statusCode = response.status;
        const fallbackMessages: Partial<Record<number, string>> = {
          400: getMessage('invalidRequest', resolvedLang),
          401: getMessage('sessionExpired', resolvedLang),
          403: getMessage('permissionDenied', resolvedLang),
          404: getMessage('resourceNotFound', resolvedLang),
          500: getMessage('serverError', resolvedLang),
        };
        const message = errorData.message || fallbackMessages[statusCode] || `HTTP ${statusCode}`;

        if (statusCode === 401) {
          onUnauthorized?.();
        }

        throw new ApiError(statusCode, message);
      }

      const data = (await response.json()) as unknown;

      if (data && typeof data === 'object') {
        const maybePayload = data as ApiResponse;
        if (typeof maybePayload.success === 'boolean' && !maybePayload.success) {
          const businessMessage = maybePayload.message || maybePayload.error || getMessage('businessRuleError', resolvedLang);
          throw new ApiError(400, businessMessage);
        }
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, getMessage('networkError', resolvedLang));
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
