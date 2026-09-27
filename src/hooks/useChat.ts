import { useState } from 'react';
import type { GreenApiClient } from '../api/greenApi';
import { demoChat, demoMessages} from '../mock/mockData';
import type { Chat } from '../types/chat';
import { useChatMessages } from './useChatMessages';
import { useCreateChat } from './useCreateChat';
import { useNotifications } from './useNotifications';
import { useSendMessage } from './useSendMessage';

interface UseChatProps {
  client: GreenApiClient | null;
  demoMode: boolean;
}

export function useChat({
  client,
  demoMode,
}: UseChatProps) {
  const [
    activeChat,
    setActiveChat,
  ] = useState<Chat | null>(
    demoMode
      ? demoChat
      : null,
  );

  const messages =
    useChatMessages(
      demoMode
        ? demoMessages
        : [],
    );

  const createChat =
    useCreateChat({
      client,

      onChatCreated: (
        chat,
        initialMessages,
      ) => {
        setActiveChat(chat);

        messages.setInitialMessages(
          initialMessages,
        );
      },
    });

  const sendMessage =
    useSendMessage({
      client,
      activeChat,
      demoMode,

      onMessage:
        messages.addMessage,
    });

  const notificationStatus =
    useNotifications({
      client,
      chatId:
        activeChat?.chatId ?? null,
      enabled:
        !demoMode &&
        Boolean(client) &&
        Boolean(activeChat),
      onIncomingMessage:
        messages.addIncomingMessage,
    });

  const reset = (
    nextDemoMode = demoMode,
  ) => {
    setActiveChat(
      nextDemoMode
        ? demoChat
        : null,
    );

    if (nextDemoMode) {
      messages.setInitialMessages(
        demoMessages,
      );
    } else {
      messages.reset();
    }

    createChat.reset();
    sendMessage.reset();
  };

  return {
    activeChat,

    messages:
      messages.messages,

    creating:
      createChat.creating,

    sending:
      sendMessage.sending,

    error:
      createChat.error ??
      sendMessage.error,

    notificationStatus,

    createChat:
      createChat.createChat,

    sendMessage:
      sendMessage.sendMessage,

    reset,
  };
}