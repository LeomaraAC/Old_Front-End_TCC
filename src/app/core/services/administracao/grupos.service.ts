import { Observable } from 'rxjs';
import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BACKEND_API } from '../../../app.api';
import {Page} from '../../../model/grupos/allGroups.model';
import { ListaPermissoesSevices } from './listaPermissoes.service';

@Injectable()
export class GrupoService {
  constructor(private http: HttpClient) {}

  getAllGroups(filter = '', page = 0, size = 3, order = 'asc'): Observable<Page> {
    let params = new HttpParams();
       params = params.append('page', page.toString());
    if (filter === '') {
      return this.http
        .get<Page>(`${BACKEND_API}groupUsers/grupo/${order}/${size}`, { params: params });
    } else {
      return this.http
        .get<Page>(`${BACKEND_API}groupUsers/grupo/${order}/${size}/${filter}`, { params: params });
    }
  }

  createGroup(descricaoGrupo: string, permissoes: ListaPermissoesSevices): Observable<string> {
   return this.http.post<string>(`${BACKEND_API}groupUsers/grupo`, {
    nomeGrupo: descricaoGrupo,
    permissoes: permissoes.getItensId()
   });
  }
}

