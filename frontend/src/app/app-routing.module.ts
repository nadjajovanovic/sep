import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { ExamTypeComponent } from './components/exam-type/exam-type.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { StateComponent } from './components/state/state.component';
import { MunicipalityComponent } from './components/municipality/municipality.component';
import { CityComponent } from './components/city/city.component';
import { FacilityComponent } from './components/facility/facility.component';
import { AppoitmentComponent } from './components/appoitment/appoitment.component';
import { ExamComponent } from './components/exam/exam.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'exam-type', component: ExamTypeComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'state', component: StateComponent },
  { path: 'municipality', component: MunicipalityComponent },
  { path: 'city', component: CityComponent },
  { path: 'facility', component: FacilityComponent },
  { path: 'appoitment', component: AppoitmentComponent },
  { path: 'exam', component: ExamComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
