import { useState } from 'react';
import type { GreenApiClient } from '../api/greenApi';
import type {Chat, ChatMessage} from '../types/chat';
import {getDemoReply} from '../utils/chat';
import {getErrorMessage} from '../utils/errors';

interface UseSendMessageProps {
  client: GreenApiClient | null;
  activeChat: Chat | null;
  demoMode: boolean;

  onMessage: (
    message: ChatMessage,
  ) => void;
}

export function useSendMessage({
  client,
  activeChat,
  demoMode,
  onMessage,
}: UseSendMessageProps) {
  const [
    sending,
    setSending,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const sendMessage = async (
    text: string,
  ) => {
    if (demoMode) {
      const outgoingMessage:
        ChatMessage = {
          id: `demo-outgoing-${Date.now()}`,
          text,
          timestamp:
            Math.floor(
              Date.now() / 1000,
            ),
          direction: 'outgoing',
          status: 'sent',
        };

      onMessage(outgoingMessage);

      setSending(true);

      window.setTimeout(() => {
        onMessage({
          id: `demo-incoming-${Date.now()}`,
          text: getDemoReply(text),
          timestamp:
            Math.floor(
              Date.now() / 1000,
            ),
          direction: 'incoming',
        });

        setSending(false);
      }, 900);

      return;
    }

    if (!client || !activeChat) {
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response =
        await client.sendMessage(
          activeChat.chatId,
          text,
        );

      onMessage({
        id: response.idMessage,
        text,
        timestamp:
          Math.floor(
            Date.now() / 1000,
          ),
        direction: 'outgoing',
        status: 'sent',
      });
    } catch (error) {
      setError(
        getErrorMessage(error),
      );
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSending(false);
    setError(null);
  };

  return {
    sending,
    error,
    sendMessage,
    reset,
  };
}