export interface GreenApiCredentials {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export interface GreenApiStateResponse {
  stateInstance: string;
}

export interface GreenApiSettings {
  wid: string;
  typeInstance: string;
  webhookUrl: string;
  webhookUrlToken?: string;
  incomingWebhook?: string;
  outgoingWebhook?: string;
  outgoingMessageWebhook?: string;
  stateWebhook?: string;
  delaySendMessagesMilliseconds?: number;
}

export interface CheckAccountSuccess {
  exist: boolean;
  chatId: string;
  username?: string;
  phoneNumber?: number;
  fromCache?: boolean;
}

export interface CheckAccountFailure {
  status: false;
  reason?: string;
  data?: {
    status?: string;
    reason?: string;
    retryAfter?: number;
  };
}

export type CheckAccountResponse =
  | CheckAccountSuccess
  | CheckAccountFailure;

export interface ContactInfoResponse {
  avatar?: string;
  name?: string;
  contactName?: string;
  chatId: string;
  chatType?: string;
  lastSeen?: number;
  phoneNumber?: number;
  username?: string;
  isPremium?: boolean;
  isVerified?: boolean;
  isScam?: boolean;
  description?: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: GreenApiWebhook;
}

export interface DeleteNotificationResponse {
  result: boolean;
  reason?: string;
}

export interface GreenApiWebhook {
  typeWebhook?: string;
  instanceData?: {
    idInstance?: number;
    wid?: string;
    typeInstance?: string;
  };
  timestamp?: number;
  idMessage?: string;

  senderData?: {
    chatId?: string;
    chatType?: string;
    sender?: string;
    senderName?: string;
    senderType?: string;
    senderContactName?: string;
    senderPhoneNumber?: number;
  };

  messageData?: {
    typeMessage?: string;
    textMessageData?: {
      textMessage?: string;
      isForwarded?: boolean;
      forwardingScore?: number;
    };
  };

  [key: string]: unknown;
}

export interface GreenApiHistoryMessage {
  type: 'incoming' | 'outgoing';
  idMessage: string;
  timestamp: number;
  statusMessage?: string;
  sendByApi?: boolean;
  typeMessage: string;
  chatId: string;
  chatType?: string;
  senderName?: string;
  senderType?: string;
  senderContactName?: string;
  textMessage?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
}