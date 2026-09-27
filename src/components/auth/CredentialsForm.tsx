import type {SubmitEvent} from 'react';
import type {GreenApiCredentials} from '../../types/greenApi';
import { FormField } from './FormField';

interface CredentialsFormProps {
  form: GreenApiCredentials;
  loading: boolean;
  error: string | null;

  onChange: (
    field: keyof GreenApiCredentials,
    value: string,
  ) => void;

  onSubmit: (
    event: SubmitEvent<HTMLFormElement>,
  ) => Promise<void>;

  onDemo: () => void;
}

export function CredentialsForm({
  form,
  loading,
  error,
  onChange,
  onSubmit,
  onDemo,
}: CredentialsFormProps) {
  return (
    <form
      className="auth-form"
      onSubmit={onSubmit}
    >
      <FormField
        label="API URL"
        type="url"
        placeholder="https://XXXX.api.green-api.com"
        value={form.apiUrl}
        onChange={(event) =>
          onChange(
            'apiUrl',
            event.target.value,
          )
        }
        hint="Значение находится в параметрах вашего инстанса GREEN-API."
        required
      />

      <FormField
        label="idInstance"
        type="text"
        inputMode="numeric"
        placeholder="4100000000"
        value={form.idInstance}
        onChange={(event) =>
          onChange(
            'idInstance',
            event.target.value,
          )
        }
        required
      />

      <FormField
        label="apiTokenInstance"
        type="password"
        placeholder="Ваш API token"
        value={form.apiTokenInstance}
        onChange={(event) =>
          onChange(
            'apiTokenInstance',
            event.target.value,
          )
        }
        required
      />

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <button
        className="primary-button"
        type="submit"
        disabled={loading}
      >
        {loading
          ? 'Подключение...'
          : 'Подключиться'}
      </button>

      <div className="demo-divider">
        <span>или</span>
      </div>

      <button
        className="demo-button"
        type="button"
        onClick={onDemo}
        disabled={loading}
      >
        Посмотреть демо
      </button>
    </form>
  );
}
