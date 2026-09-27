import { useCallback, useState } from 'react';
import type {ChatMessage, IncomingTextMessage} from '../types/chat';

export function useChatMessages(
  initialMessages: ChatMessage[] = [],
) {
  const [
    messages,
    setMessages,
  ] = useState<ChatMessage[]>(
    initialMessages,
  );

  const setInitialMessages = (
    nextMessages: ChatMessage[],
  ) => {
    setMessages(nextMessages);
  };

  const addMessage = (
    message: ChatMessage,
  ) => {
    setMessages((previous) => [
      ...previous,
      message,
    ]);
  };

  const addIncomingMessage =
    useCallback(
      (incoming: IncomingTextMessage) => {
        setMessages((previous) => {
          const exists =
            previous.some(
              (message) =>
                message.id ===
                incoming.id,
            );

          if (exists) {
            return previous;
          }

          return [
            ...previous,
            {
              id: incoming.id,
              text: incoming.text,
              timestamp:
                incoming.timestamp,
              direction: 'incoming',
            },
          ];
        });
      },
      [],
    );

  const reset = () => {
    setMessages([]);
  };

  return {
    messages,
    setInitialMessages,
    addMessage,
    addIncomingMessage,
    reset,
  };
}