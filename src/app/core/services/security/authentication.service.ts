import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { BACKEND_API } from '../../../app.api';
import { UserLogin } from '../../../model/userLogin.model';
import { User } from '../../../model/user.model';
import * as jwt_decode from 'jwt-decode';

interface TTokenDto {
  foo: string;
  exp: number;
  iat: number;
}

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}


  /**
   * @function getToken - Recupera o token do localStorage
   * @returns string - retorna o token do usuário
   */
  getToken(): string {
    const userLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
    if (userLoggedIn) {
      return userLoggedIn['access_token'];
    }
    return undefined;
  }

  /**
   * @function getTokenExpirationDate
   * @param  {string} token - Recebe o token do usuário
   * @returns Date - Retorna a data que o token expira
   */
  getTokenExpirationDate(token: string): Date {
    // let decoded = jwt_decode(token);
    const decoded: TTokenDto = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * @function isLoggedIn - Validar se o usuário está logado e se o token não expirou
   * @returns boolean - Retorna casoo token esteja expirado retorna false, caso contrario retorna true
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token === undefined) {
      return false;
    }
    const expirationDate = this.getTokenExpirationDate(token);
    // Se a data do token for maior do que a data atual significa que ele ainda não expirou
    return expirationDate.valueOf() > new Date().valueOf();
  }

  /**
   * @function login - Realizar o login do usuário e armazena-lo no localStorage
   * @param  {string} prontuario - prontuario do usuário
   * @param  {string} senha - senha do usuário
   * @returns Observable
   */
  login(prontuario: string, senha: string): Observable<UserLogin> {
    return this.http
      .post<UserLogin>(`${BACKEND_API}auth/login`, {
        prontuario: prontuario,
        senha: senha
      }).pipe(
        tap(user => localStorage.setItem('currentUser', JSON.stringify(user)))
      );
  }
  /**
   * @function logout - Função chamada para realizar o logout do usuário
   * @returns boolean
   */
  logout(): boolean {
    const token = this.getToken();
    if (token === undefined) {
      return false;
    }
   if ( this.isLoggedIn()) {
    this.returnLogout().subscribe();
    } else {
      localStorage.removeItem('currentUser');
    }
  }
  /**
   * @function returnLogout - Função private responsavel pelo observable que realiza o logout
   * @returns Observable
   */
  private returnLogout(): Observable<any> {
    return this.http
    .post<any>(`${BACKEND_API}auth/logout`, {}).pipe(
      tap(() => localStorage.removeItem('currentUser'))
    );
  }
  handleLogin(path ?: string): void {
    this.router.navigate(['/login', btoa( path)]);
  }
}
