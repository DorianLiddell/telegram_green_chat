import type {
  ContactInfoResponse,
  GreenApiCredentials,
  GreenApiHistoryMessage,
} from '../../types/greenApi';

import {requestGreenApi} from './http';

export async function getContactInfo(
  credentials: GreenApiCredentials,
  chatId: string,
  signal?: AbortSignal,
): Promise<ContactInfoResponse> {
  const response =
    await requestGreenApi<ContactInfoResponse>(
      credentials,
      'getContactInfo',
      {
        method: 'POST',
        signal,
        body: JSON.stringify({
          chatId,
        }),
      },
    );

  if (!response) {
    throw new Error(
      'GREEN-API не вернул информацию о контакте.',
    );
  }

  return response;
}

export async function getChatHistory(
  credentials: GreenApiCredentials,
  chatId: string,
  count = 50,
  signal?: AbortSignal,
): Promise<GreenApiHistoryMessage[]> {
  const response =
    await requestGreenApi<
      GreenApiHistoryMessage[]
    >(
      credentials,
      'getChatHistory',
      {
        method: 'POST',
        signal,
        body: JSON.stringify({
          chatId,
          count,
        }),
      },
    );

  return response ?? [];
}