import type {
  DeleteNotificationResponse,
  GreenApiCredentials,
  ReceiveNotificationResponse,
} from '../../types/greenApi';

import {requestGreenApi} from './http';

export async function receiveNotification(
  credentials: GreenApiCredentials,
  receiveTimeout = 60,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | null> {
  const params =
    new URLSearchParams({
      receiveTimeout:
        String(receiveTimeout),
    });

  return requestGreenApi<ReceiveNotificationResponse>(
    credentials,
    'receiveNotification',
    {
      method: 'GET',
      signal,
    },
    `?${params.toString()}`,
  );
}

export async function deleteNotification(
  credentials: GreenApiCredentials,
  receiptId: number,
  signal?: AbortSignal,
): Promise<DeleteNotificationResponse> {
  const response =
    await requestGreenApi<DeleteNotificationResponse>(
      credentials,
      'deleteNotification',
      {
        method: 'DELETE',
        signal,
      },
      `/${receiptId}`,
    );

  if (!response) {
    throw new Error(
      'GREEN-API не вернул результат удаления уведомления.',
    );
  }

  return response;
}