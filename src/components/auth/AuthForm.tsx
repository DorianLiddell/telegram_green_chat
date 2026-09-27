import type {GreenApiCredentials} from '../../types/greenApi';
import { useAuthForm } from '../../hooks/useAuthForm';
import { AuthFooter } from './AuthFooter';
import { AuthHeader } from './AuthHeader';
import { CredentialsForm } from './CredentialsForm';

interface AuthFormProps {
  loading: boolean;
  error: string | null;

  onConnect: (
    credentials: GreenApiCredentials,
  ) => Promise<void>;

  onDemo: () => void;
}

export function AuthForm({
  loading,
  error,
  onConnect,
  onDemo,
}: AuthFormProps) {
  const {
    form,
    setField,
    handleSubmit,
  } = useAuthForm(onConnect);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <AuthHeader />

        <CredentialsForm
          form={form}
          loading={loading}
          error={error}
          onChange={setField}
          onSubmit={handleSubmit}
          onDemo={onDemo}
        />

        <AuthFooter />
      </section>
    </main>
  );
}