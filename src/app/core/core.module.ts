import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptor} from './interceptor/auth.interceptor';
import {AuthenticationService} from './services/security/authentication.service';
import {AuthGuard} from './guard/auth.guard';
import {NotificationService} from './services/notification.service';
import {GrupoService} from './services/administracao/grupos.service';
import {GruposDataSouce} from './services/administracao/grupos.datasource';
import {SearchService} from './services/administracao/search.service';

@NgModule({
  providers: [
    AuthenticationService,
    NotificationService,
    AuthGuard,
    GrupoService,
    GruposDataSouce,
    SearchService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule {}
