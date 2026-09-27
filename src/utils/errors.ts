import { GreenApiError } from '../api/greenApi';

export function getErrorMessage(error: unknown): string {
  if (error instanceof GreenApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Произошла неизвестная ошибка';
}