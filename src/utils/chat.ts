import type { GreenApiClient } from '../api/greenApi';
import type {ChatMessage} from '../types/chat';

export function mapHistoryToMessages(
  history: Awaited<
    ReturnType<
      GreenApiClient['getChatHistory']
    >
  >,
): ChatMessage[] {
  return history
    .filter(
      (item) =>
        item.typeMessage ===
          'textMessage' &&
        Boolean(item.textMessage),
    )
    .map((item) => ({
      id: item.idMessage,
      text: item.textMessage ?? '',
      timestamp: item.timestamp,
      direction: item.type,
      status: item.statusMessage,
    }))
    .sort(
      (a, b) =>
        a.timestamp - b.timestamp,
    );
}

export function getDemoReply(
  text: string,
): string {
  const normalizedText =
    text.toLowerCase();

  if (
    normalizedText.includes('привет') ||
    normalizedText.includes('здравств')
  ) {
    return 'Привет! 👋 Это автоматический ответ в демо-режиме.';
  }

  if (
    normalizedText.includes('тест')
  ) {
    return 'Да, тестовый режим работает. GREEN-API при этом не используется.';
  }

  if (
    normalizedText.includes('спасибо')
  ) {
    return 'Пожалуйста! 😊';
  }

  return 'Сообщение получено. Это демонстрационный ответ.';
}