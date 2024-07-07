import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  NgxMatDateAdapter,
  NgxMatDateFormats,
} from '@angular-material-components/datetime-picker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

export const MY_NGX_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'DD.MM.yyyy HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-measurement-dialog',
  templateUrl: './measurement-modal.component.html',
  styleUrls: ['./measurement-modal.component.css'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: MY_NGX_DATE_FORMATS },
  ],
})
export class MeasurementModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MeasurementModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id?: number; source: string; date: Date },
    private dateAdapter: NgxMatDateAdapter<Date>
  ) {}

  save(): void {
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
