import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { DialogService } from './services/dialog.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './services/auth.service';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DialogDoctorComponent } from './components/dialogs/dialog-doctor/dialog-doctor.component';
import { DoctorService } from './services/doctor.service';
import { PatientComponent } from './components/patient/patient.component';
import { DialogPatientComponent } from './components/dialogs/dialog-patient/dialog-patient.component';
import { PatientService } from './services/patient.service';
import { ExamTypeComponent } from './components/exam-type/exam-type.component';
import { DialogExamTypeComponent } from './components/dialogs/dialog-exam-type/dialog-exam-type.component';
import { ExamTypeService } from './services/exam-type.service';
import { InsuranceService } from './services/insurance.service';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { DialogInsuranceComponent } from './components/dialogs/dialog-insurance/dialog-insurance.component';
import { StateService } from './services/state.service';
import { StateComponent } from './components/state/state.component';
import { DialogStateComponent } from './components/dialogs/dialog-state/dialog-state.component';
import { MunicipalityService } from './services/municipality.service';
import { MunicipalityComponent } from './components/municipality/municipality.component';
import { DialogMunicipalityComponent } from './components/dialogs/dialog-municipality/dialog-municipality.component';
import { CityComponent } from './components/city/city.component';
import { DialogCityComponent } from './components/dialogs/dialog-city/dialog-city.component';
import { CityService } from './services/city.service';
import { FacilityComponent } from './components/facility/facility.component';
import { DialogFacilityComponent } from './components/dialogs/dialog-facility/dialog-facility.component';
import { FacilityService } from './services/facility.service';
import { AppoitmentComponent } from './components/appoitment/appoitment.component';
import { DialogAppoitmentComponent } from './components/dialogs/dialog-appoitment/dialog-appoitment.component';
import { AppoitmentService } from './services/appoitment.service';
import { ExamComponent } from './components/exam/exam.component';
import { DialogExamComponent } from './components/dialogs/dialog-exam/dialog-exam.component';
import { ExamService } from './services/exam.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatConfirmDialogComponent,
    RegisterComponent,
    LoginComponent,
    DoctorComponent,
    DialogDoctorComponent,
    PatientComponent,
    DialogPatientComponent,
    ExamTypeComponent,
    DialogExamTypeComponent,
    InsuranceComponent,
    DialogInsuranceComponent,
    StateComponent,
    DialogStateComponent,
    MunicipalityComponent,
    DialogMunicipalityComponent,
    CityComponent,
    DialogCityComponent,
    FacilityComponent,
    DialogFacilityComponent,
    AppoitmentComponent,
    DialogAppoitmentComponent,
    ExamComponent,
    DialogExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [MatConfirmDialogComponent, DialogDoctorComponent, DialogPatientComponent, 
    DialogExamTypeComponent, DialogInsuranceComponent, DialogStateComponent, 
    DialogMunicipalityComponent, DialogCityComponent, DialogFacilityComponent,
    DialogAppoitmentComponent, DialogExamComponent],
  providers: [NotificationService, DialogService, AuthService, DoctorService, PatientService, 
    ExamTypeService, InsuranceService, StateService, MunicipalityService, CityService, 
    FacilityService, AppoitmentService, ExamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
