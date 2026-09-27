import type { Chat } from '../../types/chat';
import { NewChatForm } from './NewChatForm';

interface ChatSidebarProps {
  chat: Chat | null;
  loading: boolean;
  error: string | null;
  onCreateChat: (
    phoneNumber: string,
  ) => Promise<void>;
  onLogout: () => void;
}

export function ChatSidebar({
  chat,
  loading,
  error,
  onCreateChat,
  onLogout,
}: ChatSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="brand">
          <div className="brand__icon">➤</div>

          <div>
            <strong>Telegram</strong>
            <span>GREEN-API Chat</span>
          </div>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          Выйти
        </button>
      </div>

      <NewChatForm
        loading={loading}
        onCreateChat={onCreateChat}
      />

      {error && (
        <div className="sidebar-error sidebar-error--global">
          {error}
        </div>
      )}

      <div className="sidebar__section">
        <div className="sidebar__section-title">
          Чаты
        </div>

        {chat ? (
          <div className="chat-preview chat-preview--active">
            <div className="chat-preview__avatar">
              {chat.displayName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="chat-preview__content">
              <strong>
                {chat.displayName}
              </strong>

              <span>
                {chat.username ??
                  chat.phoneNumber}
              </span>
            </div>

            <span className="chat-preview__status">
              ●
            </span>
          </div>
        ) : (
          <div className="empty-sidebar">
            Создайте чат по номеру
            телефона.
          </div>
        )}
      </div>
    </aside>
  );
}