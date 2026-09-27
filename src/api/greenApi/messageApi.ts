import type {GreenApiCredentials, SendMessageResponse} from '../../types/greenApi';
import {requestGreenApi} from './http';

export async function sendMessage(
  credentials: GreenApiCredentials,
  chatId: string,
  message: string,
  signal?: AbortSignal,
): Promise<SendMessageResponse> {
  const response =
    await requestGreenApi<SendMessageResponse>(
      credentials,
      'sendMessage',
      {
        method: 'POST',
        signal,
        body: JSON.stringify({
          chatId,
          message,
        }),
      },
    );

  if (!response?.idMessage) {
    throw new Error(
      'GREEN-API не вернул идентификатор сообщения.',
    );
  }

  return response;
}