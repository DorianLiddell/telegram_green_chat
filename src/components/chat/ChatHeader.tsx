import type { Chat } from '../../types/chat';
import type { NotificationStatus } from '../../hooks/useNotifications';

interface ChatHeaderProps {
  chat: Chat;
  notificationStatus: NotificationStatus;
}

function getStatusText(
  status: NotificationStatus,
): string {
  switch (status) {
    case 'connecting':
      return 'Подключение...';

    case 'connected':
      return 'Сообщения получаются';

    case 'error':
      return 'Ошибка получения';

    default:
      return 'Не подключено';
  }
}

export function ChatHeader({
  chat,
  notificationStatus,
}: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-header__avatar">
        {chat.displayName
          .charAt(0)
          .toUpperCase()}
      </div>

      <div className="chat-header__info">
        <strong>{chat.displayName}</strong>

        <span>
          {chat.username ??
            chat.phoneNumber}
        </span>
      </div>

      <div className="chat-header__status">
        <span
          className={`status-dot status-dot--${notificationStatus}`}
        />

        <span>
          {getStatusText(
            notificationStatus,
          )}
        </span>
      </div>
    </header>
  );
}