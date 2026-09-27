import { useState } from 'react';
import type { GreenApiClient } from '../api/greenApi';
import type { Chat } from '../types/chat';
import { getErrorMessage } from '../utils/errors';

import {
  formatPhoneNumber,
  normalizePhoneNumber,
} from '../utils/phone';

import { mapHistoryToMessages } from '../utils/chat';

interface UseCreateChatProps {
  client: GreenApiClient | null;

  onChatCreated: (
    chat: Chat,
    messages: ReturnType<
      typeof mapHistoryToMessages
    >,
  ) => void;
}

export function useCreateChat({
  client,
  onChatCreated,
}: UseCreateChatProps) {
  const [
    creating,
    setCreating,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const createChat = async (
    inputPhone: string,
  ) => {
    if (!client) {
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const phone =
        normalizePhoneNumber(
          inputPhone,
        );

      const account =
        await client.checkAccount(
          phone,
        );

      if ('status' in account) {
        throw new Error(
          account.reason ??
            account.data?.reason ??
            'Не удалось проверить номер телефона.',
        );
      }

      if (
        !account.exist ||
        !account.chatId
      ) {
        throw new Error(
          'У указанного номера не найден Telegram-аккаунт.',
        );
      }

      let contact = null;

      try {
        contact =
          await client.getContactInfo(
            account.chatId,
          );
      } catch (error) {
        console.warn(
          'Не удалось получить информацию о контакте:',
          error,
        );
      }

      let history = [];

      try {
        history =
          await client.getChatHistory(
            account.chatId,
            50,
          );
      } catch (error) {
        console.warn(
          'Не удалось загрузить историю:',
          error,
        );
      }

      const displayName =
        contact?.name ||
        contact?.contactName ||
        contact?.username ||
        account.username ||
        formatPhoneNumber(phone);

      const chat: Chat = {
        chatId: account.chatId,
        phoneNumber:
          formatPhoneNumber(phone),
        displayName,
        username:
          contact?.username ||
          account.username,
      };

      onChatCreated(
        chat,
        mapHistoryToMessages(
          history,
        ),
      );
    } catch (error) {
      setError(
        getErrorMessage(error),
      );
    } finally {
      setCreating(false);
    }
  };

  const reset = () => {
    setCreating(false);
    setError(null);
  };

  return {
    creating,
    error,
    createChat,
    reset,
  };
}