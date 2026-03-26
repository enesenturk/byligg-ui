export type Language = 'tr' | 'en';

export const LANGUAGE_MAP: Record<Language, string> = {
  tr: 'tr-TR',
  en: 'en-US',
};

export const SUPPORTED_LANGUAGES: Language[] = ['tr', 'en'];

export function isSupportedLanguage(value: unknown): value is Language {
  return value === 'tr' || value === 'en';
}

export function toLocale(value: Language): string {
  return LANGUAGE_MAP[value];
}

export function parseLocale(locale: string): Language {
  if (locale.startsWith('tr')) return 'tr';
  if (locale.startsWith('en')) return 'en';
  return 'tr';
}

// API Error Messages - Similar to .NET resx files
export const API_ERROR_MESSAGES: Record<Language, Record<string, string>> = {
  tr: {
    invalidRequest: 'Geçersiz istek',
    sessionExpired: 'Oturum süreniz doldu, lütfen tekrar giriş yapın',
    permissionDenied: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
    resourceNotFound: 'İstenen kaynak bulunamadı',
    serverError: 'Sunucu hatası, lütfen daha sonra tekrar deneyin',
    networkError: 'İnternet bağlantınızı kontrol edin',
    businessRuleError: 'İş kuralı hatası',
    unexpectedError: 'Beklenmeyen bir hata oluştu',
  },
  en: {
    invalidRequest: 'Invalid request',
    sessionExpired: 'Your session has expired, please log in again',
    permissionDenied: 'An error occurred. Please try again later.',
    resourceNotFound: 'Requested resource not found',
    serverError: 'Server error, please try again later',
    networkError: 'Please check your internet connection',
    businessRuleError: 'Business rule error',
    unexpectedError: 'An unexpected error occurred',
  },
};

export function getApiErrorMessage(key: keyof typeof API_ERROR_MESSAGES.tr, lang: Language): string {
  return API_ERROR_MESSAGES[lang][key];
}
