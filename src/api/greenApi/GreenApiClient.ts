import type {
  CheckAccountResponse,
  ContactInfoResponse,
  DeleteNotificationResponse,
  GreenApiCredentials,
  GreenApiHistoryMessage,
  GreenApiSettings,
  GreenApiStateResponse,
  ReceiveNotificationResponse,
  SendMessageResponse,
} from '../../types/greenApi';

import {
  checkAccount,
  getSettings,
  getStateInstance,
} from './accountApi';

import {
  getChatHistory,
  getContactInfo,
} from './chatApi';

import {
  deleteNotification,
  receiveNotification,
} from './notificationApi';

import {sendMessage} from './messageApi';

export class GreenApiClient {
  private readonly credentials: GreenApiCredentials;

  constructor(
    credentials: GreenApiCredentials,
  ) {
    if (
      !credentials.apiUrl.trim()
    ) {
      throw new Error(
        'apiUrl не может быть пустым.',
      );
    }

    if (
      !/^https?:\/\//i.test(
        credentials.apiUrl.trim(),
      )
    ) {
      throw new Error(
        'apiUrl должен начинаться с http:// или https://',
      );
    }

    if (
      !/^\d+$/.test(
        credentials.idInstance.trim(),
      )
    ) {
      throw new Error(
        'idInstance должен содержать только цифры.',
      );
    }

    if (
      !credentials.apiTokenInstance.trim()
    ) {
      throw new Error(
        'apiTokenInstance не может быть пустым.',
      );
    }

    this.credentials = {
      apiUrl:
        credentials.apiUrl
          .trim()
          .replace(/\/+$/, ''),
      idInstance:
        credentials.idInstance.trim(),
      apiTokenInstance:
        credentials.apiTokenInstance.trim(),
    };
  }

  getStateInstance(
    signal?: AbortSignal,
  ): Promise<GreenApiStateResponse> {
    return getStateInstance(
      this.credentials,
      signal,
    );
  }

  getSettings(
    signal?: AbortSignal,
  ): Promise<GreenApiSettings> {
    return getSettings(
      this.credentials,
      signal,
    );
  }

  checkAccount(
    phoneNumber: string,
    signal?: AbortSignal,
  ): Promise<CheckAccountResponse> {
    return checkAccount(
      this.credentials,
      phoneNumber,
      signal,
    );
  }

  getContactInfo(
    chatId: string,
    signal?: AbortSignal,
  ): Promise<ContactInfoResponse> {
    return getContactInfo(
      this.credentials,
      chatId,
      signal,
    );
  }

  getChatHistory(
    chatId: string,
    count = 50,
    signal?: AbortSignal,
  ): Promise<GreenApiHistoryMessage[]> {
    return getChatHistory(
      this.credentials,
      chatId,
      count,
      signal,
    );
  }

  sendMessage(
    chatId: string,
    message: string,
    signal?: AbortSignal,
  ): Promise<SendMessageResponse> {
    return sendMessage(
      this.credentials,
      chatId,
      message,
      signal,
    );
  }

  receiveNotification(
    receiveTimeout = 60,
    signal?: AbortSignal,
  ): Promise<ReceiveNotificationResponse | null> {
    return receiveNotification(
      this.credentials,
      receiveTimeout,
      signal,
    );
  }

  deleteNotification(
    receiptId: number,
    signal?: AbortSignal,
  ): Promise<DeleteNotificationResponse> {
    return deleteNotification(
      this.credentials,
      receiptId,
      signal,
    );
  }
}