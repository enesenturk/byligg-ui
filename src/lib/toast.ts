import toast from 'react-hot-toast';
import { ApiError } from './api';

export function handleApiError(error: unknown, lang: 'tr' | 'en' = 'tr') {
  if (error instanceof ApiError) {
    const messages = {
      tr: {
        400: 'Geçersiz istek',
        401: 'Oturumunuz sona erdi, lütfen tekrar giriş yapın',
        403: 'Bu işlem için yetkiniz yok',
        404: 'İstenen kaynak bulunamadı',
        500: 'Sunucu hatası, lütfen daha sonra tekrar deneyin',
        0: 'İnternet bağlantınızı kontrol edin',
      },
      en: {
        400: 'Invalid request',
        401: 'Your session has expired, please log in again',
        403: 'You do not have permission for this action',
        404: 'Requested resource not found',
        500: 'Server error, please try again later',
        0: 'Please check your internet connection',
      },
    };

    const message = messages[lang][error.status as keyof typeof messages.tr] || error.message;
    toast.error(message);
  } else {
    const message = lang === 'tr' ? 'Beklenmeyen bir hata oluştu' : 'An unexpected error occurred';
    toast.error(message);
  }
}

export function showSuccess(message: string) {
  toast.success(message);
}

export function showError(message: string) {
  toast.error(message);
}

export function showInfo(message: string) {
  toast(message, {
    icon: 'ℹ️',
  });
}

export function showWarning(message: string) {
  toast(message, {
    icon: '⚠️',
  });
}