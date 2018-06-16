import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MatInputModule, MatIconModule, MAT_OPTION_PARENT_COMPONENT } from '@angular/material';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

import { AppComponent } from './app.component';
import {LoginComponent} from './feature/login/login.component';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {ApplicationErrorHandle} from './app.error-handler';

import {ROUTES} from './app.routes';

import {NotFoundComponent} from './feature/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    McBreadcrumbsModule.forRoot()
  ],
  providers: [{provide: ErrorHandler, useClass: ApplicationErrorHandle}],
  bootstrap: [AppComponent]
})
export class AppModule { }
