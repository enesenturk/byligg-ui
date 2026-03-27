import toast from 'react-hot-toast';
import { ApiError } from './api';
import { Language, getMessage } from '@/lib/constants/language';

export function handleApiError(error: unknown, lang: Language = 'tr') {
  if (error instanceof ApiError) {
    let message: string;

    switch (error.status) {
      case 400:
        message = getMessage('invalidRequest', lang);
        break;
      case 401:
        message = getMessage('sessionExpired', lang);
        break;
      case 403:
        message = getMessage('permissionDenied', lang);
        break;
      case 404:
        message = getMessage('resourceNotFound', lang);
        break;
      case 500:
        message = getMessage('serverError', lang);
        break;
      case 0:
        message = getMessage('networkError', lang);
        break;
      default:
        message = error.message;
    }

    toast.error(message);
  } else {
    const message = getMessage('unexpectedError', lang);
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