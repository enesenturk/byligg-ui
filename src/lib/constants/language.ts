export type Language = 'tr' | 'en';

export const LANGUAGE_MAP: Record<Language, string> = {
  tr: 'tr-TR',
  en: 'en-US',
};

export const SUPPORTED_LANGUAGES: Language[] = ['tr', 'en'];

export function isSupportedLanguage(value: unknown): value is Language {
  return value === 'tr' || value === 'en';
}

export function getSupportedLanguage(text: string): Language {
  return text.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

export function toLocale(value: Language): string {
  return LANGUAGE_MAP[value];
}

export function parseLocale(locale: string): Language {
  if (locale.startsWith('tr')) return 'tr';
  if (locale.startsWith('en')) return 'en';
  return 'tr';
}

// UI Message Keys - Type-safe message identifiers
export type UIMessageKey =
  // API Error Messages
  | 'invalidRequest'
  | 'sessionExpired'
  | 'permissionDenied'
  | 'resourceNotFound'
  | 'serverError'
  | 'networkError'
  | 'businessRuleError'
  | 'unexpectedError'
  // Date/Time Messages
  | 'now'
  | 'minutesAgo'
  | 'hoursAgo'
  | 'daysAgo'
  // General UI Messages
  | 'tokenNotReceived'
  | 'serverConnectionFailed'
  // Form Validation Messages
  | 'displayNameRequired'
  | 'displayNameLength'
  | 'usernameRequired'
  | 'usernameLength'
  | 'usernameInvalid'
  | 'emailRequired'
  | 'emailInvalid'
  | 'passwordRequired'
  | 'passwordLength'
  | 'passwordComplexity'
  | 'confirmPasswordRequired'
  | 'passwordsNotMatch'
  // Navigation Messages
  | 'navFeatures'
  | 'navPricing'
  | 'navAbout'
  | 'navBlog';


// Single source of truth for all UI messages
export const uiMessages: Record<UIMessageKey, Record<Language, string>> = {
  // API Error Messages
  invalidRequest: {
    tr: 'Geçersiz istek',
    en: 'Invalid request',
  },
  sessionExpired: {
    tr: 'Oturum süreniz doldu, lütfen tekrar giriş yapın',
    en: 'Your session has expired, please log in again',
  },
  permissionDenied: {
    tr: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
    en: 'An error occurred. Please try again later.',
  },
  resourceNotFound: {
    tr: 'İstenen kaynak bulunamadı',
    en: 'Requested resource not found',
  },
  serverError: {
    tr: 'Sunucu hatası, lütfen daha sonra tekrar deneyin',
    en: 'Server error, please try again later',
  },
  networkError: {
    tr: 'İnternet bağlantınızı kontrol edin',
    en: 'Please check your internet connection',
  },
  businessRuleError: {
    tr: 'İş kuralı hatası',
    en: 'Business rule error',
  },
  unexpectedError: {
    tr: 'Beklenmeyen bir hata oluştu',
    en: 'An unexpected error occurred',
  },
  // Date/Time Messages
  now: {
    tr: 'Şimdi',
    en: 'Now',
  },
  minutesAgo: {
    tr: 'dakika önce',
    en: 'minutes ago',
  },
  hoursAgo: {
    tr: 'saat önce',
    en: 'hours ago',
  },
  daysAgo: {
    tr: 'gün önce',
    en: 'days ago',
  },
  // General UI Messages
  tokenNotReceived: {
    tr: 'Token alınamadı',
    en: 'Could not get token',
  },
  serverConnectionFailed: {
    tr: 'Sunucuya bağlanılamadı',
    en: 'Could not connect to server',
  },
  // Form Validation Messages
  displayNameRequired: {
    tr: 'Görünen ad zorunlu',
    en: 'Display name is required',
  },
  displayNameLength: {
    tr: '2-60 karakter olmalı',
    en: 'Must be 2-60 characters',
  },
  usernameRequired: {
    tr: 'Kullanıcı adı zorunlu',
    en: 'Username is required',
  },
  usernameLength: {
    tr: '3-30 karakter olmalı',
    en: 'Must be 3-30 characters',
  },
  usernameInvalid: {
    tr: 'Sadece harf, rakam, _ ve . kullanılabilir',
    en: 'Only letters, numbers, _ and . allowed',
  },
  emailRequired: {
    tr: 'E-posta zorunlu',
    en: 'Email is required',
  },
  emailInvalid: {
    tr: 'Geçerli bir e-posta gir',
    en: 'Enter a valid email',
  },
  passwordRequired: {
    tr: 'Şifre zorunlu',
    en: 'Password is required',
  },
  passwordLength: {
    tr: 'En az 6 karakter olmalı',
    en: 'Must be at least 6 characters',
  },
  passwordComplexity: {
    tr: 'En az 1 harf ve 1 rakam içermeli',
    en: 'Must include at least 1 letter and 1 number',
  },
  confirmPasswordRequired: {
    tr: 'Şifre tekrarı zorunlu',
    en: 'Please confirm your password',
  },
  passwordsNotMatch: {
    tr: 'Şifreler eşleşmiyor',
    en: 'Passwords do not match',
  },
  // Navigation Messages
  navFeatures: {
    tr: 'Ürün',
    en: 'Features',
  },
  navPricing: {
    tr: 'Fiyatlandırma',
    en: 'Pricing',
  },
  navAbout: {
    tr: 'Hakkımızda',
    en: 'About',
  },
  navBlog: {
    tr: 'Blog',
    en: 'Blog',
  },
};


/**
 * Gets a localized message based on the key and language
 * @param key - The message key
 * @param lang - The target language
 * @returns The localized message string
 */
export function getMessage(key: UIMessageKey, lang: Language): string {
  return uiMessages[key][lang];
}

/**
 * Gets a localized message with culture parameter (defaults to 'tr' if not provided)
 * @param key - The message key
 * @param culture - The culture string (e.g., 'tr-TR', 'en-US')
 * @returns The localized message string
 */
export function getMessageByCulture(key: UIMessageKey, culture?: string): string {
  const lang = culture ? parseLocale(culture) : 'tr';
  return getMessage(key, lang);
}

/**
 * Creates a message getter function bound to a specific language
 * @param lang - The target language
 * @returns A function that takes a key and returns the localized message
 */
export function createMessageGetter(lang: Language): (key: UIMessageKey) => string {
  return (key: UIMessageKey) => getMessage(key, lang);
}

/**
 * Creates a message getter function bound to a specific culture
 * @param culture - The culture string (e.g., 'tr-TR', 'en-US')
 * @returns A function that takes a key and returns the localized message
 */
export function createMessageGetterByCulture(culture?: string): (key: UIMessageKey) => string {
  const lang = culture ? parseLocale(culture) : 'tr';
  return createMessageGetter(lang);
}

export function getCurrencyCode(lang: Language): string {
  return lang === 'tr' ? 'TRY' : 'USD';
}

export function getLocaleString(lang: Language): string {
  return lang === 'tr' ? 'tr-TR' : 'en-US';
}
