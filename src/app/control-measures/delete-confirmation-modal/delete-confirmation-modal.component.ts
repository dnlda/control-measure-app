import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  onDelete(): void {
    this.activeModal.close(true);
  }

  onCancel(): void {
    this.activeModal.dismiss();
  }
}
