import { useState } from 'react';
import { GreenApiClient } from '../api/greenApi';
import type {GreenApiCredentials} from '../types/greenApi';
import { getErrorMessage } from '../utils/errors';

export function useAuth() {
  const [client, setClient] =
    useState<GreenApiClient | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const connect = async (
    credentials: GreenApiCredentials,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const nextClient =
        new GreenApiClient(credentials);

      const [
        state,
        settings,
      ] = await Promise.all([
        nextClient.getStateInstance(),
        nextClient.getSettings(),
      ]);

      if (
        settings.typeInstance !==
        'telegram'
      ) {
        throw new Error(
          'Этот инстанс GREEN-API не подключён к Telegram.',
        );
      }

      if (
        state.stateInstance !==
        'authorized'
      ) {
        throw new Error(
          `Инстанс не авторизован. Текущее состояние: ${state.stateInstance}. Авторизуйте инстанс в GREEN-API Console.`,
        );
      }

      if (
        settings.webhookUrl?.trim()
      ) {
        throw new Error(
          'Для HTTP API получения сообщений webhookUrl должен быть пустым. Очистите webhook URL в настройках инстанса GREEN-API.',
        );
      }

      if (
        settings.incomingWebhook !==
        'yes'
      ) {
        throw new Error(
          'В настройках GREEN-API включите получение уведомлений о входящих сообщениях.',
        );
      }

      setClient(nextClient);
    } catch (error) {
      setError(
        getErrorMessage(error),
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setClient(null);
    setError(null);
    setLoading(false);
  };

  return {
    client,
    loading,
    error,
    connect,
    reset,
  };
}