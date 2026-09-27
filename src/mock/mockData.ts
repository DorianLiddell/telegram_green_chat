import type {Chat, ChatMessage} from '../types/chat';

const now = Math.floor(Date.now() / 1000);

export const demoChat: Chat = {
  chatId: 'demo-chat-id',
  phoneNumber: '+79991234567',
  displayName: 'Алексей Смирнов',
  username: '@alexey_smirnov',
};

export const demoMessages: ChatMessage[] = [
  {
    id: 'demo-1',
    text: 'Привет! Это демонстрационный чат.',
    timestamp: now - 60 * 45,
    direction: 'incoming',
  },
  {
    id: 'demo-2',
    text: 'Привет! Проверяю интерфейс тестового задания.',
    timestamp: now - 60 * 42,
    direction: 'outgoing',
    status: 'sent',
  },
  {
    id: 'demo-3',
    text: 'Выглядит неплохо 👍',
    timestamp: now - 60 * 40,
    direction: 'incoming',
  },
  {
    id: 'demo-4',
    text: 'Спасибо! Сейчас проверяю отправку сообщений.',
    timestamp: now - 60 * 38,
    direction: 'outgoing',
    status: 'sent',
  },
  {
    id: 'demo-5',
    text: 'Хорошо. Напиши, когда закончишь.',
    timestamp: now - 60 * 35,
    direction: 'incoming',
  },
];
