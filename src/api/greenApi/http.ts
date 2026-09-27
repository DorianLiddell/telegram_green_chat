import type {GreenApiCredentials} from '../../types/greenApi';
import {extractReason, GreenApiError} from './errors';

function parseJson(
  value: string,
): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function buildApiUrl(
  credentials: GreenApiCredentials,
  method: string,
  suffix = '',
): string {
  const apiUrl =
    credentials.apiUrl
      .trim()
      .replace(/\/+$/, '');

  const idInstance = encodeURIComponent(
    credentials.idInstance.trim(),
  );

  const token =
    encodeURIComponent(
      credentials.apiTokenInstance.trim(),
    );

  return [
    apiUrl,
    `waInstance${idInstance}`,
    method,
    token,
  ].join('/') + suffix;
}

export async function requestGreenApi<T>(
  credentials: GreenApiCredentials,
  method: string,
  init: RequestInit = {},
  suffix = '',
): Promise<T | null> {
  const url = buildApiUrl(
    credentials,
    method,
    suffix,
  );

  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type':
          'application/json',
        ...init.headers,
      },
    });
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      throw error;
    }

    throw new GreenApiError(
      'Не удалось подключиться к GREEN-API. Проверьте apiUrl и интернет-соединение.',
    );
  }

  const text =
    await response.text();

  if (!text) {
    if (!response.ok) {
      throw new GreenApiError(
        `GREEN-API вернул HTTP ${response.status}`,
        response.status,
      );
    }

    return null;
  }

  const payload =
    parseJson(text);

  if (!response.ok) {
    const reason =
      extractReason(payload);

    throw new GreenApiError(
      reason ??
        `GREEN-API вернул HTTP ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload as T;
}