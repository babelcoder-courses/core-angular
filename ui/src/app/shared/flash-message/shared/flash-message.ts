export type FlashMessageTypes = 'success' | 'info' | 'warning' | 'danger';

export interface FlashMessage {
  message: string,
  type: FlashMessageTypes
}
