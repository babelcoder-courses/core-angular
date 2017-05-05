import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FlashMessage, FlashMessageTypes } from './flash-message';

@Injectable()
export class FlashMessageService {

  messageStream = new Subject<FlashMessage>();

  constructor() { }

  getMessage(): Subject<FlashMessage> {
    return this.messageStream;
  }

  addMessage(type: FlashMessageTypes, message: string) {
    this.messageStream.next({ type, message });
  }

  clearMessage() {
    this.messageStream.next(null);
  }

}
