import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { NotificationService } from './core/services/notification.service';

@Injectable()
export class ApplicationErrorHandle extends ErrorHandler {
  constructor(private zone: NgZone, private ns: NotificationService) {
    super();
  }
  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.errors;
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 400:
            this.ns.notifySnackbar(message || 'Token inválido!', true);
            break;
          case 401:
            this.ns.notifySnackbar(message || 'Não autorizado!', true);
            break;
          case 404:
            this.ns.notifySnackbar(message || 'Recurso não encontrado!', true);
            break;
          case 422:
            const errors = Object.keys(errorResponse.error.errors);
            const numError = errors.length;
            let linha = 1, item = '';
            for (const k of errors) {
              item += errorResponse.error.errors[k][0];
              if (linha < numError) {
                item += '<br>';
              }
              linha++;
            }
            this.ns.notifySnackbar(item, true);
            break;
          case 500:
            this.ns.notifySnackbar(message || 'Falha no servidor!', true);
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
