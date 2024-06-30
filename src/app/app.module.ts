import { NgModule, Component, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { SimpleMessageModalComponent } from './control-measures/simple-message-modal/simple-message-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ControlMeasuresComponent,
    MeasurementModalComponent,
    SubstationListComponent,
    ReportsComponent,
    ServiceComponent,
    SimpleMessageModalComponent
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
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule, 
    
    
 
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
