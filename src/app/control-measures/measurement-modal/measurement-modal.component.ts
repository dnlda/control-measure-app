import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-measurement-modal',
  templateUrl: './measurement-modal.component.html'
})
export class MeasurementModalComponent {
  @Input() data!: { id?: number; date: Date; source: string };

  constructor(public activeModal: NgbActiveModal) {}

  save() {
    this.activeModal.close(this.data);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
