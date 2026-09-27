import {
  useState,
  type SubmitEvent,
} from 'react';

import type {GreenApiCredentials} from '../types/greenApi';

const initialForm: GreenApiCredentials = {
  apiUrl: '',
  idInstance: '',
  apiTokenInstance: '',
};

export function useAuthForm(
  onConnect: (
    credentials: GreenApiCredentials,
  ) => Promise<void>,
) {
  const [form, setForm] =
    useState<GreenApiCredentials>(
      initialForm,
    );

  const setField = (
    field: keyof GreenApiCredentials,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onConnect({
      apiUrl: form.apiUrl.trim(),
      idInstance:
        form.idInstance.trim(),
      apiTokenInstance:
        form.apiTokenInstance.trim(),
    });
  };

  return {
    form,
    setField,
    handleSubmit,
  };
}

