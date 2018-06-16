import {ErrorHandler, Injectable, NgZone} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
import { NotificationService } from './core/services/notification.service'

@Injectable()
export class ApplicationErrorHandle extends ErrorHandler {
  constructor(private zone: NgZone, private ns: NotificationService) {
    super()
  }
  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.error
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 400:
            this.ns.notify(message || 'Token inválido!')
            break
          case 401:
            this.ns.notify(message || 'Não autorizado!')
            break
          case 404:
            this.ns.notify(message || 'Recurso não encontrado!')
            break
          case 500:
            this.ns.notify(message || 'Falha no servidor!')
            break
        }
      })
    }
    super.handleError(errorResponse)
  }
}
