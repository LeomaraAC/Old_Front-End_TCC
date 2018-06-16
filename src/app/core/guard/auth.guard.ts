import {Injectable} from '@angular/core';
import {CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../services/security/authentication.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor (private authenticationService:  AuthenticationService, private ns: NotificationService) {}
  /**
   * @function checkAuthentication - Função responsavel por verificar se o usuário está logado para permitir o seu acesso
   * @param  {string} path - Caminho que será redirecionado após realizar login;
   * @returns boolean
   */
  private checkAuthentication(path: string): boolean {
    const loggedIn = this.authenticationService.isLoggedIn();
     if (!loggedIn) {
      // this.ns.notify('Usuário não autenticado!')
      this.authenticationService.handleLogin(`${path}`);
    }
    return loggedIn;
  }
  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }
  canActivate(ar: ActivatedRouteSnapshot, rt: RouterStateSnapshot): boolean {
    return this.checkAuthentication(rt.url);
  }
}
