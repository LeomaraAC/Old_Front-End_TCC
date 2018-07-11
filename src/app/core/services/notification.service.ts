import {EventEmitter} from '@angular/core';

export class NotificationService {
  notifierDialog = new EventEmitter<string>();
  notifierSnackbar = new EventEmitter<string[]>();
  notifyDialog(message: string) {
    this.notifierDialog.emit(message);
  }
  notifySnackbar(message: string, erro: boolean) {
    this.notifierSnackbar.emit([message, erro.toString()]);
  }
}
