import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptor} from './interceptor/auth.interceptor';
import {AuthenticationService} from './services/security/authentication.service';
import {AuthGuard} from './guard/auth.guard';
import {NotificationService} from './services/notification.service';
import {GrupoService} from './services/administracao/grupos.service';
import {GruposDataSouce} from './services/administracao/grupos.datasource';
import { PermissoesTelasService } from './services/administracao/permissoesTelas.service';
import {PermissoesTelasDataSouce} from './services/administracao/permissoesTelas.datasource';
import {SearchService} from './services/administracao/search.service';
import { ListaPermissoesSevices } from './services/administracao/listaPermissoes.service';

@NgModule({
  providers: [
    AuthenticationService,
    NotificationService,
    AuthGuard,
    GrupoService,
    GruposDataSouce,
    PermissoesTelasService,
    PermissoesTelasDataSouce,
    ListaPermissoesSevices,
    SearchService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule {}
