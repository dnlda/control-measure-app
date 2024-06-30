import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
})
export class DeleteConfirmationModalComponent {
  @Input() data!: { id: number; date: Date; source: string };

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
