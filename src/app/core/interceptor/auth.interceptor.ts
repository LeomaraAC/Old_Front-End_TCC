import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/security/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private loginService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    if (token !== undefined) {
      const authRequest = request.clone({setHeaders: { Authorization: `Bearer ${token}`}});
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
