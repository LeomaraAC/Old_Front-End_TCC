import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationService } from './core/services/notification.service';
import { ModalComponent } from './shared/message/modal/modal.component';

@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.notification.notifierDialog.subscribe(message =>
      this.dialog.open(ModalComponent, {
        minWidth: '300px',
        data: { message: message, title: 'ERRO', error: true }
      })
    );
  }
}
