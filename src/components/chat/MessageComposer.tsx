import {
  useState,
  type KeyboardEvent,
} from 'react';

interface MessageComposerProps {
  disabled: boolean;
  sending: boolean;
  onSend: (
    message: string,
  ) => Promise<void>;
}

export function MessageComposer({
  disabled,
  sending,
  onSend,
}: MessageComposerProps) {
  const [message, setMessage] =
    useState('');

  const sendCurrentMessage =
    async () => {
      const value = message.trim();

      if (
        !value ||
        disabled ||
        sending
      ) {
        return;
      }

      await onSend(value);
      setMessage('');
    };

  const handleKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault();

      await sendCurrentMessage();
    }
  };

  return (
    <div className="composer">
      <textarea
        className="composer__input"
        placeholder={
          disabled
            ? 'Сначала создайте чат'
            : 'Напишите сообщение...'
        }
        value={message}
        maxLength={4096}
        disabled={disabled || sending}
        onChange={(event) =>
          setMessage(event.target.value)
        }
        onKeyDown={handleKeyDown}
        rows={1}
      />

      <button
        className="send-button"
        type="button"
        disabled={
          disabled ||
          sending ||
          !message.trim()
        }
        onClick={() =>
          void sendCurrentMessage()
        }
        aria-label="Отправить"
      >
        {sending ? '...' : '➤'}
      </button>
    </div>
  );
}