export class GreenApiError extends Error {
  public readonly status?: number;
  public readonly payload?: unknown;

  constructor(
    message: string,
    status?: number,
    payload?: unknown,
  ) {
    super(message);

    this.name = 'GreenApiError';
    this.status = status;
    this.payload = payload;
  }
}

export function extractReason(
  payload: unknown,
): string | undefined {
  if (
    !payload ||
    typeof payload !== 'object'
  ) {
    return undefined;
  }

  const data =
    payload as Record<string, unknown>;

  if (typeof data.reason === 'string') {
    return data.reason;
  }

  if (typeof data.message === 'string') {
    return data.message;
  }

  if (typeof data.error === 'string') {
    return data.error;
  }

  if (
    data.data &&
    typeof data.data === 'object'
  ) {
    const nestedData =
      data.data as Record<string, unknown>;

    if (
      typeof nestedData.reason === 'string'
    ) {
      return nestedData.reason;
    }

    if (
      typeof nestedData.message === 'string'
    ) {
      return nestedData.message;
    }
  }

  return undefined;
}