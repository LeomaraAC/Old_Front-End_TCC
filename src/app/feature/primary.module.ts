import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
// import {AngularFontAwesomeModule} from 'angular-font-awesome'
import {MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatIconModule,
            MatTooltipModule} from '@angular/material';
import {PerfectScrollbarModule,
              PERFECT_SCROLLBAR_CONFIG,
              PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

import {ROUTES} from './main.routes';
import { AppComponent } from './app/app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { HomeComponent } from './home/home.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [

  AppComponent,

  SidenavComponent,

  SidenavItemComponent,

  HomeComponent],
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    // AngularFontAwesomeModule,
    RouterModule.forChild(ROUTES),
    McBreadcrumbsModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PrimaryModule {}
