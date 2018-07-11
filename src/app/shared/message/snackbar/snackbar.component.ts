import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../../../core/services/notification.service';
import { tap, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'tcc-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden',  style({
        opacity: 0,
        bottom: 0
      })),
      state('visible',  style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ] )
  ]
})
export class SnackbarComponent implements OnInit {

  message: string;
  error: boolean;
  snackVisibility = 'hidden';
  constructor(private notificationService: NotificationService ) { }

  ngOnInit() {
    this.notificationService.notifierSnackbar.pipe(
      tap(message => {
        this.message = message[0];
        this.error = message[1] === 'true';
        this.snackVisibility = 'visible';
      }),
      switchMap(() => timer(3000))
    ).subscribe(() => this.snackVisibility = 'hidden');
  }

}
