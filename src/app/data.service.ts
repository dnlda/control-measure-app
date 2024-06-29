import { Injectable } from '@angular/core';


export interface Measurement {
  id: number;
  date: Date;
  source: string;
  faze: number;
  voltage: number;
  amperage: number;
  power: number;
  rPower: number;
  powerFactor: number;
}


@Injectable({
  providedIn: 'root',
})
export class DataService {
   private measurements: Measurement[] = [
    { id: 1, date: new Date(), source: 'Источник 1', faze: 42, voltage: 2, amperage: 2, power: 2, rPower: 3, powerFactor: 5 },
        { id: 2, date: new Date(), source: 'Источник 2', faze: 42, voltage: 2, amperage: 2, power: 2, rPower: 3, powerFactor: 5 },
  ];

  constructor() {}

  getAllMeasurements(): Measurement[] {
    return this.measurements;
  }

  addMeasurement(newMeasurement: Measurement) {
    this.measurements.push({
      id: this.measurements.length + 1,
      date: newMeasurement.date,
      source: newMeasurement.source,
      faze: newMeasurement.faze,
      voltage: newMeasurement.voltage,
      amperage: newMeasurement.amperage,
      power: newMeasurement.power,
      rPower: newMeasurement.rPower,
      powerFactor: newMeasurement.powerFactor,
    });
  }

  editMeasurement(updatedMeasurement: Measurement) {
    const index = this.measurements.findIndex(
      (m) => m.id == updatedMeasurement.id
    );
    if (index !== -1) {
      this.measurements[index].date = updatedMeasurement.date;
      this.measurements[index].source = updatedMeasurement.source;
      this.measurements[index].faze = updatedMeasurement.faze;
      this.measurements[index].voltage = updatedMeasurement.voltage;
      this.measurements[index].amperage = updatedMeasurement.amperage;
      this.measurements[index].power = updatedMeasurement.power;
      this.measurements[index].rPower = updatedMeasurement.rPower;
      this.measurements[index].powerFactor = updatedMeasurement.powerFactor;

    }
  }

  deleteMeasurement(measurementId: number) {
    this.measurements = this.measurements.filter((m) => m.id !== measurementId);
  }
}