import { Injectable } from '@angular/core';
import { measures } from './measurement-data';

export interface MeasurementData {
  id: number;
  date: Date;
  source: string;
  faze: string;
  voltage: number;
  amperage: number;
  power: number;
  rPower: number;
  powerFactor: number;
}

export interface Measurement {
  id: number;
  name: string;
  voltage: number;
  data: MeasurementData[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private measurements: Measurement[] = measures;

  constructor() {}

  getAllMeasurements(): Measurement[] {
    return this.measurements;
  }

  getMeasurementById(id: number): Measurement | undefined {
    return this.measurements.find(m => m.id === id);
  }

  addMeasurement(measurementId: number, newMeasurement: { date: Date; source: string }) {
    const measurement = this.getMeasurementById(measurementId);
    if (measurement) {
      const newId = measurement.data.length > 0 ? Math.max(...measurement.data.map(d => d.id)) + 1 : 1;
      measurement.data.push({
        id: newId,
        date: newMeasurement.date,
        source: newMeasurement.source,
        faze: this.getRandomFaze(),
        voltage: this.getRandomNumber(),
        amperage: this.getRandomNumber(),
        power: this.getRandomNumber(),
        rPower: this.getRandomNumber(),
        powerFactor: this.getRandomNumber(),
      });
    }
  }

  editMeasurement(measurementId: number, updatedMeasurement: { id: number; date: Date; source: string }) {
    const measurement = this.getMeasurementById(measurementId);
    if (measurement) {
      const index = measurement.data.findIndex(m => m.id === updatedMeasurement.id);
      if (index !== -1) {
        measurement.data[index].date = updatedMeasurement.date;
        measurement.data[index].source = updatedMeasurement.source;
      }
    }
  }

  deleteMeasurement(measurementId: number, measurementDataId: number) {
    const measurement = this.getMeasurementById(measurementId);
    if (measurement) {
      measurement.data = measurement.data.filter(m => m.id !== measurementDataId);
    }
  }

  private getRandomFaze(): string {
    const fazes = ['a', 'b', 'c', '-', 'ab'];
    return fazes[Math.floor(Math.random() * fazes.length)];
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 101);
  }
}
