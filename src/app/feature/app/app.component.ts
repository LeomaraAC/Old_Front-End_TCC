import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav, MatDrawer } from '@angular/material';

@Component({
  selector: 'tcc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sideNavOpened = true; /* Define se o menu lateral vai ser aberto */
  matDrawerOpened = false; /* Define se o menu lateral pequeno vai ser aberto */
  sideNavMode = 'side';
  screenSize: String;
  disableClose: boolean;

  rota: string;

  constructor(private media: ObservableMedia, private router: Router) {}

  ngOnInit() {
    this.media.subscribe((mediaChange: MediaChange) => this.toggleView());
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.rota = event.url;
      }
    });
    this.rota = this.router.routerState.snapshot.url;
  }

  toggleView(): void {
    if (this.media.isActive('gt-sm')) {
      /* Configurações para quando a tela tiver, no mínimo 960px */
      this.sideNavMode = 'side';
      this.sideNavOpened = true;
      this.matDrawerOpened = false;
      this.screenSize = 'gt-sm';
    } else if (this.media.isActive('gt-xs')) {
      /* Configurações para quando a tela tiver, no mínimo 600px */
      this.sideNavMode = 'side';
      this.sideNavOpened = false;
      this.matDrawerOpened = true;
      this.screenSize = 'gt-xs';
    } else if (this.media.isActive('lt-sm')) {
      /* Configurações para quando a tela tiver, no maximo 599px */
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = true;
      this.screenSize = 'lt-sm';
    }
  }

  menu(sidenav: MatSidenav, drawer: MatDrawer): void {
    sidenav.toggle();
    drawer.toggle();
  }
}
