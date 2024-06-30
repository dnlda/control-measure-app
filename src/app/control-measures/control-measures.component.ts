import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService, MeasurementData } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementModalComponent } from './measurement-modal/measurement-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-control-measures',
  templateUrl: './control-measures.component.html',
  styleUrls: ['./control-measures.component.css']
})
export class ControlMeasuresComponent implements OnChanges {
  @Input() measurementId: number | null = null;
  measurementData: MeasurementData[] = [];
  selectedMeasurement: MeasurementData | null = null;
  sortByDateDescending = false;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['measurementId'] && this.measurementId !== null) {
      this.loadMeasurementData(this.measurementId);
    }
  }

  loadMeasurementData(id: number) {
    const measurement = this.dataService.getMeasurementById(id);
    this.measurementData = measurement ? measurement.data : [];
  }

  addMeasurement() {
    const modalRef = this.modalService.open(MeasurementModalComponent);
    modalRef.componentInstance.data = { date: new Date(), source: '' };

    modalRef.result.then(result => {
      if (result) {
        this.dataService.addMeasurement(this.measurementId!, result);
        this.loadMeasurementData(this.measurementId!);
      }
    }, reason => {
      // Обработка закрытия модального окна без сохранения данных
    });
  }

  editSelectedMeasurement() {
    if (this.selectedMeasurement) {
      const modalRef = this.modalService.open(MeasurementModalComponent);
      modalRef.componentInstance.data = {
        id: this.selectedMeasurement.id,
        date: this.selectedMeasurement.date,
        source: this.selectedMeasurement.source
      };

      modalRef.result.then(result => {
        if (result) {
          this.dataService.editMeasurement(this.measurementId!, result);
          this.loadMeasurementData(this.measurementId!);
        }
      }, reason => {
        // Обработка закрытия модального окна без сохранения данных
      });
    }
  }

  confirmDeleteSelectedMeasurement() {
    if (this.selectedMeasurement) {
      const modalRef = this.modalService.open(DeleteConfirmationModalComponent);
      modalRef.componentInstance.data = {
        id: this.selectedMeasurement.id,
        date: this.selectedMeasurement.date,
        source: this.selectedMeasurement.source
      };
  
      modalRef.result.then(result => {
        if (result && this.selectedMeasurement) {
          this.dataService.deleteMeasurement(this.measurementId!, this.selectedMeasurement.id);
          this.loadMeasurementData(this.measurementId!);
          this.selectedMeasurement = null; // Сбрасываем выбранное измерение после удаления
        }
      }, reason => {
        // Обработка закрытия модального окна без подтверждения удаления
      });
    }
  }
  

  selectMeasurement(measurement: MeasurementData) {
    if (this.selectedMeasurement === measurement) {
      this.selectedMeasurement = null; // Сброс выбора, если тот же чекбокс был нажат повторно
    } else {
      this.selectedMeasurement = measurement; // Выбор нового измерения
    }
  }

  getDate(dateTime: Date): string {
    return dateTime.toISOString().split('T')[0];
  }

  getTime(dateTime: Date): string {
    return dateTime.toISOString().split('T')[1].split('.')[0];
  }

  sortMeasurements() {
    if (this.sortByDateDescending) {
      this.measurementData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.measurementData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }
}
