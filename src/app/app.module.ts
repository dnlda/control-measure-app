import { NgModule, Component, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ControlMeasuresComponent } from './control-measures/control-measures.component';
import { MeasurementModalComponent } from './control-measures/measurement-modal/measurement-modal.component';
import { SubstationListComponent } from './substation-list/substation-list.component';
import { ReportsComponent } from './reports/reports.component'; // Путь к ReportsComponent
import { ServiceComponent } from './service/service.component';
import { DataService } from './data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ControlMeasuresComponent,
    MeasurementModalComponent,
    SubstationListComponent,
    ReportsComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule,
    MatButtonToggleModule,
    MatSelectModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
