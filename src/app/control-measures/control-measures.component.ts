import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { DataService, MeasurementData } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { MeasurementModalComponent } from './measurement-modal/measurement-modal.component';
import { SimpleMessageModalComponent } from './simple-message-modal/simple-message-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-control-measures',
  templateUrl: './control-measures.component.html',
  styleUrls: ['./control-measures.component.css'],
})
export class ControlMeasuresComponent implements OnChanges {
  @Input() measurementId: number | null = null;
  measurementData: MeasurementData[] = [];
  selectedMeasurements: MeasurementData[] = [];
  sortByDateDescending = false;
  allSelected = false;
  indeterminate = false;
  isFullscreen = false;
  measurementSetName = '';

  constructor(
    private dataService: DataService,
    private modalService: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['measurementId'] && this.measurementId !== null) {
      this.loadMeasurementData(this.measurementId);
      this.measurementSetName = this.getMeasurementSetName(this.measurementId);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isFullscreen) {
      this.toggleFullscreen();
      alert('Выход из полноэкранного режима');
    }
  }

  loadMeasurementData(id: number) {
    const measurement = this.dataService.getMeasurementById(id);
    this.measurementData = measurement ? measurement.data : [];
    this.updateCheckboxStates();
  }

  getMeasurementSetName(id: number): string {
    const measurement = this.dataService.getMeasurementById(id);
    return measurement ? measurement.name : '';
  }

  addMeasurement() {
    const dialogRef = this.modalService.open(MeasurementModalComponent, {
      width: '400px',
      data: { source: '', date: new Date() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.addMeasurement(this.measurementId!, result);
        this.loadMeasurementData(this.measurementId!);
      }
    });
  }

  editSelectedMeasurement() {
    if (this.selectedMeasurements.length !== 1) {
      this.showSingleSelectionError();
      return;
    }
    const selectedMeasurement = this.selectedMeasurements[0];
    const dialogRef = this.modalService.open(MeasurementModalComponent, {
      width: '400px',
      data: {
        id: selectedMeasurement.id,
        source: selectedMeasurement.source,
        date: selectedMeasurement.date,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.editMeasurement(this.measurementId!, result);
        this.loadMeasurementData(this.measurementId!);
      }
    });
  }

  confirmDeleteSelectedMeasurement() {
    if (this.selectedMeasurements.length === 0) {
      return; // Если нет выбранных измерений, ничего не делаем
    }

    const dialogRef = this.modalService.open(DeleteConfirmationModalComponent, {
      width: '400px',
      data: { ids: this.selectedMeasurements.map((m) => m.id) }, // Передача данных в модальное окно
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) { // Если пользователь подтвердил удаление
        this.selectedMeasurements.forEach((measurement) => {
          this.dataService.deleteMeasurement(this.measurementId!, measurement.id);
        });
        this.loadMeasurementData(this.measurementId!);
        this.selectedMeasurements = [];
      }
    });
  }

  selectMeasurement(event: Event, measurement: MeasurementData) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.selectedMeasurements.push(measurement);
    } else {
      this.selectedMeasurements = this.selectedMeasurements.filter(
        (m) => m !== measurement
      );
    }
    this.updateCheckboxStates();
  }
  selectAll(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.allSelected = inputElement.checked;
    if (this.allSelected) {
      this.selectedMeasurements = [...this.measurementData];
    } else {
      this.selectedMeasurements = [];
    }
    this.indeterminate = false;
  }

  updateCheckboxStates() {
    this.allSelected =
      this.selectedMeasurements.length === this.measurementData.length;
    this.indeterminate =
      this.selectedMeasurements.length > 0 && !this.allSelected;
  }

  showSingleSelectionError() {
    const dialogRef = this.modalService.open(SimpleMessageModalComponent, {
      width: '400px',
      data: { message: 'Выберите только одну запись' },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  getDate(dateTime: Date): string {
    const isoDate = dateTime.toISOString().split('T')[0];
    return isoDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
  }

  getTime(dateTime: Date): string {
    return dateTime.toISOString().split('T')[1].split('.')[0];
  }

  sortMeasurements() {
    if (this.sortByDateDescending) {
      this.measurementData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.measurementData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  }

  toggleSortOrder() {
    this.sortByDateDescending = !this.sortByDateDescending;
    this.sortMeasurements();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      alert('Для выхода нажмите Esc');
    }
  }
}
