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
