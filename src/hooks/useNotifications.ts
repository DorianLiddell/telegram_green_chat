import {useEffect, useState} from 'react';
import { GreenApiClient } from '../api/greenApi';
import type {IncomingTextMessage} from '../types/chat';

interface UseNotificationsParams {
  client: GreenApiClient | null;
  chatId: string | null;
  enabled: boolean;
  onIncomingMessage: (
    message: IncomingTextMessage,
  ) => void;
}

export type NotificationStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'error';

function sleep(
  ms: number,
): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(
      resolve,
      ms,
    );
  });
}

export function useNotifications({
  client,
  chatId,
  enabled,
  onIncomingMessage,
}: UseNotificationsParams): NotificationStatus {
  const [status, setStatus] =
    useState<NotificationStatus>(
      'idle',
    );

  useEffect(() => {
    if (
      !client ||
      !chatId ||
      !enabled
    ) {
      return;
    }

    const controller =
      new AbortController();

    let stopped = false;

    async function poll(): Promise<void> {
      while (!stopped) {
        try {
          const notification =
            await client.receiveNotification(
              60,
              controller.signal,
            );

          if (stopped) {
            break;
          }

          setStatus('connected');

          if (!notification) {
            continue;
          }

          try {
            const body =
              notification.body;

            const isIncomingTextMessage =
              body.typeWebhook ===
                'incomingMessageReceived' &&
              body.messageData
                ?.typeMessage ===
                'textMessage';

            if (
              isIncomingTextMessage &&
              body.senderData?.chatId &&
              body.idMessage &&
              body.messageData
                ?.textMessageData
                ?.textMessage
            ) {
              const incomingChatId =
                body.senderData.chatId;

              if (
                incomingChatId ===
                chatId
              ) {
                onIncomingMessage({
                  id: body.idMessage,
                  chatId:
                    incomingChatId,
                  text:
                    body
                      .messageData
                      .textMessageData
                      .textMessage,
                  timestamp:
                    body.timestamp ??
                    Math.floor(
                      Date.now() /
                        1000,
                    ),
                });
              }
            }
          } finally {
            if (
              !controller.signal.aborted
            ) {
              await client.deleteNotification(
                notification.receiptId,
                controller.signal,
              );
            }
          }
        } catch (error) {
          if (
            controller.signal.aborted ||
            stopped
          ) {
            break;
          }

          console.error(
            'GREEN-API notification error:',
            error,
          );

          setStatus('error');

          await sleep(3000);
        }
      }
    }

    void poll();

    return () => {
      stopped = true;
      controller.abort();
    };
  }, [
    client,
    chatId,
    enabled,
    onIncomingMessage,
  ]);

  if (
    !client ||
    !chatId ||
    !enabled
  ) {
    return 'idle';
  }

  if (status === 'idle') {
    return 'connecting';
  }

  return status;
}

