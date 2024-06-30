import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService, Measurement } from '../data.service';


@Component({
  selector: 'app-substation-list',
  templateUrl: './substation-list.component.html',
  styleUrl: './substation-list.component.css'
})
export class SubstationListComponent implements OnInit {
  measurements: Measurement[];
  @Output() selectedMeasurementIdChange = new EventEmitter<number>();
  defaultOptionType = 'option1';
  defaultOptionPy = 'option1';
  idNumber: number | null = 1;

  constructor(private dataService: DataService) {
    this.measurements = []
  }

  ngOnInit(): void {
    this.loadMeasurements();
  }
  
  loadMeasurements() {
    this.measurements = this.dataService.getAllMeasurements();
  }

  selectMeasurement(id: number) {
    this.selectedMeasurementIdChange.emit(id);
    this.idNumber = id;
  }

  
}
