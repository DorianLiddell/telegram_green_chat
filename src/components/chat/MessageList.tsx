import {useEffect, useRef} from 'react';
import type { ChatMessage } from '../../types/chat';

interface MessageListProps {
  messages: ChatMessage[];
}

function formatTime(
  timestamp: number,
): string {
  const date =
    new Date(timestamp * 1000);

  return new Intl.DateTimeFormat(
    'ru-RU',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  ).format(date);
}

export function MessageList({
  messages,
}: MessageListProps) {
  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="messages messages--empty">
        <div className="empty-chat">
          <div className="empty-chat__icon">
            💬
          </div>

          <h2>Сообщений пока нет</h2>

          <p>
            Отправьте первое сообщение
            собеседнику.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages">
      <div className="messages__inner">
        {messages.map((message) => {
          const isOutgoing =
            message.direction === 'outgoing';

          return (
            <div
              key={message.id}
              className={`message-row ${
                isOutgoing
                  ? 'message-row--outgoing'
                  : 'message-row--incoming'
              }`}
            >
              <div
                className={`message-bubble ${
                  isOutgoing
                    ? 'message-bubble--outgoing'
                    : 'message-bubble--incoming'
                }`}
              >
                <div className="message-bubble__text">
                  {message.text}
                </div>

                <div className="message-bubble__meta">
                  <span>
                    {formatTime(
                      message.timestamp,
                    )}
                  </span>

                  {isOutgoing && (
                    <span className="message-bubble__checks">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}