import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-measurement-dialog',
  templateUrl: './measurement-modal.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' } // Установите нужную локаль
  ]
})
export class MeasurementModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MeasurementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: number; source: string; date: Date },
    private dateAdapter: DateAdapter<Date>
  ) {}

  save(): void {
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
