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
//import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
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
    DialogExamTypeComponent
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
    DialogExamTypeComponent],
  providers: [NotificationService, DialogService, AuthService, DoctorService, PatientService, ExamTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
