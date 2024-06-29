import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-measurement-modal',
  templateUrl: './measurement-modal.component.html',
  styleUrls: ['./measurement-modal.component.css']
})
export class MeasurementModalComponent implements OnInit {
  @Input() data: any; // Данные, передаваемые из родительского компонента
  measurementForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.measurementForm = this.fb.group({
      date: [''],
      source: [''],
      faze: [''],
      voltage: [''],
      amperage: [''],
      power: [''],
      rPower: [''],
      powerFactor: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.measurementForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.measurementForm.valid) {
      this.modal.close(this.measurementForm.value);
    }
  }
}
