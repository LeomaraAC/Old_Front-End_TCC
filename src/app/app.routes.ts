import {Routes} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';

import {LoginComponent} from './feature/login/login.component';
import {NotFoundComponent} from './feature/not-found/not-found.component';

export const ROUTES: Routes = [
  {path: 'login/:to', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: './feature/primary.module#PrimaryModule',
    canLoad: [AuthGuard],
    data: {breadcrumbs: 'Home'}
  },
  {path: '**', component: NotFoundComponent}
];
