import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from '../../app.menu';

@Component({
  selector: 'tcc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  menuItem = MenuItem;
 @Input()  somenteIcones = false; // Será somente icone quando a tela for pequena
  constructor() { }

  ngOnInit() {
  }

}
