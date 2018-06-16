import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tcc-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.css']
})
export class SidenavItemComponent implements OnInit {
  @Input() menu;
  @Input() somenteIcones: boolean;
   @Input() menuSecundario = false;
  constructor() { }

  ngOnInit() {
  }
  /**
   * @function getHeight - Retorna a altura dos itens
   * @returns String
   */
  getHeight(): String {
    if ( this.menu.open === false) {
      return '48px';
    } else {
            if (this.menu && this.menu.sub) {
              const height =   (this.menu.sub.length * 56) + 56 + 'px';
              return height;
           }
        }
  }

  /**
   * @function chechForChildMenu - Verifica se o item possui submenus
   * @returns boolean
   */
  chechForChildMenu(): boolean {
    return (this.menu && this.menu.sub) ? true : false;
  }
}
