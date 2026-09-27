import type {InputHTMLAttributes} from 'react';

interface FormFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function FormField({
  label,
  hint,
  ...inputProps
}: FormFieldProps) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
      </span>

      <input
        className="field__input"
        {...inputProps}
      />

      {hint && (
        <small className="field__hint">
          {hint}
        </small>
      )}
    </label>
  );
}
