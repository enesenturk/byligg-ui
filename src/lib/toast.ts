import toast from 'react-hot-toast';
import { ApiError } from './api';
import { Language, getApiErrorMessage } from '@/lib/constants/language';

export function handleApiError(error: unknown, lang: Language = 'tr') {
  if (error instanceof ApiError) {
    let message: string;

    switch (error.status) {
      case 400:
        message = getApiErrorMessage('invalidRequest', lang);
        break;
      case 401:
        message = getApiErrorMessage('sessionExpired', lang);
        break;
      case 403:
        message = getApiErrorMessage('permissionDenied', lang);
        break;
      case 404:
        message = getApiErrorMessage('resourceNotFound', lang);
        break;
      case 500:
        message = getApiErrorMessage('serverError', lang);
        break;
      case 0:
        message = getApiErrorMessage('networkError', lang);
        break;
      default:
        message = error.message;
    }

    toast.error(message);
  } else {
    const message = getApiErrorMessage('unexpectedError', lang);
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