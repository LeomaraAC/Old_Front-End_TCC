import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/guard/auth.guard';
// import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule,
        MatInputModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatCheckboxModule,
        MatTooltipModule} from '@angular/material';
import {PerfectScrollbarModule,
        PERFECT_SCROLLBAR_CONFIG,
        PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GrupoComponent } from './grupo.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { ListarGruposComponent } from './listar-grupos/listar-grupos.component';
import { NovoGrupoComponent } from './novo-grupo/novo-grupo.component';
import { ListarFuncComponent } from './novo-grupo/listar-func/listar-func.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
const admRoutes: Routes = [
  {
    path: '',
    component: GrupoComponent,
    data: {breadcrumbs: 'Grupos'},
    canActivate: [AuthGuard]
  },
  {
    path: 'novo-grupo',
    component: NovoGrupoComponent,
    data: {breadcrumbs: 'Novo Grupo'},
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    GrupoComponent,
    PesquisaComponent,
    ListarGruposComponent,
    NovoGrupoComponent,
    ListarFuncComponent
  ],
  imports: [
    PerfectScrollbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule.forChild(admRoutes)
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    ListarFuncComponent
  ]
})
export class GrupoModule {}
