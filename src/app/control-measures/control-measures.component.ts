import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementModalComponent } from './measurement-modal/measurement-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { Measurement } from '../data.service';

@Component({
  selector: 'app-control-measures',
  templateUrl: './control-measures.component.html',
  styleUrls: ['./control-measures.component.css']
})
export class ControlMeasuresComponent implements OnInit {
  measurements: Measurement[];
  selectedMeasurement: Measurement | null = null;
  sortByDateDescending = false;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) {
    this.measurements = [];
  }

  ngOnInit(): void {
    this.loadMeasurements();
  }

  loadMeasurements() {
    this.measurements = this.dataService.getAllMeasurements();
  }

  addMeasurement() {
    const modalRef = this.modalService.open(MeasurementModalComponent);
    modalRef.componentInstance.data = null;

    modalRef.result.then(result => {
      if (result) {
        this.dataService.addMeasurement(result);
        this.loadMeasurements();
      }
    }, reason => {
      // Обработка закрытия модального окна без сохранения данных
    });
  }

  editSelectedMeasurement() {
    if (this.selectedMeasurement) {
      const modalRef = this.modalService.open(MeasurementModalComponent);
      modalRef.componentInstance.data = this.selectedMeasurement;
  
      modalRef.result.then(result => {
        if (result) {
          this.dataService.editMeasurement({ ...this.selectedMeasurement, ...result });
          this.loadMeasurements();
        }
      }, reason => {
        // Обработка закрытия модального окна без сохранения данных
      });
    }
  }

  confirmDeleteSelectedMeasurement() {
    if (this.selectedMeasurement) {
      const modalRef = this.modalService.open(DeleteConfirmationModalComponent);
      modalRef.componentInstance.data = this.selectedMeasurement;

      modalRef.result.then(result => {
        if (result && this.selectedMeasurement) {
          this.dataService.deleteMeasurement(this.selectedMeasurement.id);
          this.loadMeasurements();
          this.selectedMeasurement = null; // Сбрасываем выбранное измерение после удаления
        }
      }, reason => {
        // Обработка закрытия модального окна без подтверждения удаления
      });
    }
  }

  selectMeasurement(measurement: Measurement) {
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
      this.measurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.measurements.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }
}
