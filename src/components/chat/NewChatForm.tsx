import {
  useState,
  type SubmitEvent,
} from 'react';

import {isValidPhoneNumber} from '../../utils/phone';

interface NewChatFormProps {
  loading: boolean;
  onCreateChat: (
    phoneNumber: string,
  ) => Promise<void>;
}

export function NewChatForm({
  loading,
  onCreateChat,
}: NewChatFormProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError(null);

    if (!isValidPhoneNumber(phone)) {
      setError(
        'Введите номер в международном формате, например +79991234567.',
      );

      return;
    }

    await onCreateChat(phone);
    setPhone('');
  };

  return (
    <form
      className="new-chat-form"
      onSubmit={handleSubmit}
    >
      <div className="new-chat-form__heading">
        <span>Новый чат</span>
      </div>

      <div className="new-chat-form__row">
        <input
          className="sidebar-input"
          type="tel"
          inputMode="tel"
          placeholder="+79991234567"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
        />

        <button
          className="new-chat-button"
          type="submit"
          disabled={loading}
          aria-label="Создать чат"
          title="Создать чат"
        >
          +
        </button>
      </div>

      {error && (
        <div className="sidebar-error">
          {error}
        </div>
      )}
    </form>
  );
}
