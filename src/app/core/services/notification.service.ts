import {EventEmitter} from '@angular/core';

export class NotificationService {
  notifier = new EventEmitter<string>();
  notifierSnackbar = new EventEmitter<string[]>();
  notify(message: string) {
    this.notifier.emit(message);
  }
  notifySnackbar(message: string, erro: boolean) {
    this.notifierSnackbar.emit([message, erro.toString()]);
  }
}
