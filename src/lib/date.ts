import { useI18n } from '@/providers/i18n-provider';
import { Language, toLocale } from '@/lib/constants/language';

// Backend always sends UTC DateTime strings in ISO format
// Frontend converts to user's local timezone and formats according to locale

export function parseUtcDate(dateString: string): Date {
  // Assume dateString is in ISO format from backend (UTC)
  return new Date(dateString + (dateString.includes('Z') ? '' : 'Z'));
}

export function formatDate(date: Date | string, locale: Language = 'tr'): string {
  const d = typeof date === 'string' ? parseUtcDate(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return d.toLocaleDateString(toLocale(locale), options);
}

export function formatDateTime(date: Date | string, locale: Language = 'tr'): string {
  const d = typeof date === 'string' ? parseUtcDate(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return d.toLocaleDateString(toLocale(locale), options);
}

export function formatTime(date: Date | string, locale: Language = 'tr'): string {
  const d = typeof date === 'string' ? parseUtcDate(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return d.toLocaleTimeString(locale === 'tr' ? 'tr-TR' : 'en-US', options);
}

export function formatRelativeTime(date: Date | string, locale: Language = 'tr'): string {
  const d = typeof date === 'string' ? parseUtcDate(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (locale === 'tr') {
    if (diffMinutes < 1) return 'Şimdi';
    if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    return `${diffDays} gün önce`;
  } else {
    if (diffMinutes < 1) return 'Now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  }
}

// Hook for formatted dates
export function useDateFormatter() {
  const { lang } = useI18n();

  return {
    formatDate: (date: Date | string) => formatDate(date, lang),
    formatDateTime: (date: Date | string) => formatDateTime(date, lang),
    formatTime: (date: Date | string) => formatTime(date, lang),
    formatRelativeTime: (date: Date | string) => formatRelativeTime(date, lang),
  };
}

// Number formatting (backend sends integers/doubles, frontend formats)
export function formatNumber(num: number, locale: Language = 'tr'): string {
  return num.toLocaleString(toLocale(locale));
}

export function formatCurrency(amount: number, locale: Language = 'tr'): string {
  return amount.toLocaleString(toLocale(locale), {
    style: 'currency',
    currency: locale === 'tr' ? 'TRY' : 'USD',
  });
}