import {Routes} from '@angular/router';
import {AuthGuard} from '../core/guard/auth.guard';
import {AppComponent} from './app/app.component';
import {HomeComponent} from './home/home.component';

export const ROUTES: Routes = [
  {path: '', component: AppComponent, children: [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '\grupos',
      loadChildren:  './administracao/grupo/grupo.module#GrupoModule',
      data: {breadcrumbs: 'Grupos'},
      canLoad: [AuthGuard],
      canActivate: [AuthGuard]}
  ]}
];
