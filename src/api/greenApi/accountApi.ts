import type {
  GreenApiCredentials,
  GreenApiSettings,
  GreenApiStateResponse,
  CheckAccountResponse,
} from '../../types/greenApi';

import {requestGreenApi} from './http';

export async function getStateInstance(
  credentials: GreenApiCredentials,
  signal?: AbortSignal,
): Promise<GreenApiStateResponse> {
  const response =
    await requestGreenApi<GreenApiStateResponse>(
      credentials,
      'getStateInstance',
      {
        method: 'GET',
        signal,
      },
    );

  if (!response) {
    throw new Error(
      'GREEN-API не вернул состояние instance.',
    );
  }

  return response;
}

export async function getSettings(
  credentials: GreenApiCredentials,
  signal?: AbortSignal,
): Promise<GreenApiSettings> {
  const response =
    await requestGreenApi<GreenApiSettings>(
      credentials,
      'getSettings',
      {
        method: 'GET',
        signal,
      },
    );

  if (!response) {
    throw new Error(
      'GREEN-API не вернул настройки instance.',
    );
  }

  return response;
}

export async function checkAccount(
  credentials: GreenApiCredentials,
  phoneNumber: string,
  signal?: AbortSignal,
): Promise<CheckAccountResponse> {
  const response =
    await requestGreenApi<CheckAccountResponse>(
      credentials,
      'checkAccount',
      {
        method: 'POST',
        signal,
        body: JSON.stringify({
          phoneNumber: Number(
            phoneNumber,
          ),
          force: true,
        }),
      },
    );

  if (!response) {
    throw new Error(
      'GREEN-API не вернул результат проверки номера.',
    );
  }

  return response;
}