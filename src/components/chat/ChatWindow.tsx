import type { Chat, ChatMessage } from '../../types/chat';
import type { NotificationStatus } from '../../hooks/useNotifications';
import { ChatHeader } from './ChatHeader';
import { MessageComposer } from './MessageComposer';
import { MessageList } from './MessageList';

interface ChatWindowProps {
  chat: Chat | null;
  messages: ChatMessage[];
  notificationStatus: NotificationStatus;
  sending: boolean;
  onSend: (
    message: string,
  ) => Promise<void>;
}

export function ChatWindow({
  chat,
  messages,
  notificationStatus,
  sending,
  onSend,
}: ChatWindowProps) {
  if (!chat) {
    return (
      <main className="chat-window chat-window--empty">
        <div className="welcome">
          <div className="welcome__logo">
            ➤
          </div>

          <h1>Telegram Chat</h1>

          <p>
            Введите номер телефона в левой
            панели и создайте новый чат.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="chat-window">
      <ChatHeader
        chat={chat}
        notificationStatus={
          notificationStatus
        }
      />

      <MessageList
        messages={messages}
      />

      <MessageComposer
        disabled={!chat}
        sending={sending}
        onSend={onSend}
      />
    </main>
  );
}