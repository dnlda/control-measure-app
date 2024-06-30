import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-message-modal',
  template: `
    <h1 mat-dialog-title>Сообщение</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button class="btn" (click)="close()">OK</button>
    </div>
  `,
})
export class SimpleMessageModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SimpleMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
