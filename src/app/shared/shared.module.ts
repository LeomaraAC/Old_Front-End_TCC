import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDividerModule, MatIconModule} from '@angular/material';

import {ModalComponent} from './message/modal/modal.component';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    ModalComponent
  ],
  entryComponents: [ModalComponent]
})

export class SharedModule {}
