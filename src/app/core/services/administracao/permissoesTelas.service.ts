import { Observable } from 'rxjs';
import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BACKEND_API } from '../../../app.api';
import {Page} from '../../../model/grupos/allGroups.model';

@Injectable()
export class PermissoesTelasService {
  constructor(private http: HttpClient) {}

  getFunctions(filter = '', page = 0, size = 5, order = 'asc'): Observable<Page> {
    let params = new HttpParams();
       params = params.append('page', page.toString());
    if (filter === '') {
      return this.http
        .get<Page>(`${BACKEND_API}function/funcaoSistema/${order}/${size}`, { params: params });
    } else {
      return this.http
        .get<Page>(`${BACKEND_API}function/funcaoSistema/${order}/${size}/${filter}`, { params: params });
    }
  }
}

