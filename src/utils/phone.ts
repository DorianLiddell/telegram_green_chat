export function normalizePhoneNumber(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidPhoneNumber(value: string): boolean {
  const digits = normalizePhoneNumber(value);

  return digits.length >= 10 && digits.length <= 15;
}

export function formatPhoneNumber(value: string): string {
  const digits = normalizePhoneNumber(value);

  if (!digits) {
    return '';
  }

  return `+${digits}`;
}