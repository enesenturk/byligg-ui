import { getCookie } from './utils';
import { handleApiError } from './toast';
import { Language, toLocale, parseLocale } from '@/lib/constants/language';

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
        const message = errorData.message || `HTTP ${response.status}`;
        const error = new ApiError(response.status, message);
        handleApiError(error, resolvedLang);
        throw error;
      }

      const data = (await response.json()) as T;
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      const networkError = new ApiError(0, 'Network error or server unavailable');
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