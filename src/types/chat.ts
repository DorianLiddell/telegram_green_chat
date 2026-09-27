export type MessageDirection = 'incoming' | 'outgoing';

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
  direction: MessageDirection;
  status?: string;
}

export interface Chat {
  chatId: string;
  phoneNumber: string;
  displayName: string;
  username?: string;
}

export interface IncomingTextMessage {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
}