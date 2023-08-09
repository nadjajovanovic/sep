import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/models/doctor';
import { ExamType } from 'src/app/models/exam-type';
import { Facility } from 'src/app/models/facility';
import { Insurance } from 'src/app/models/insurance';
import { Patient } from 'src/app/models/patient';
import { FacilityService } from 'src/app/services/facility.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PatientService } from 'src/app/services/patient.service';
import { DialogAppoitmentComponent } from '../dialog-appoitment/dialog-appoitment.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { ExamTypeService } from 'src/app/services/exam-type.service';
import { InsuranceService } from 'src/app/services/insurance.service';
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam';

@Component({
  selector: 'app-dialog-exam',
  templateUrl: './dialog-exam.component.html',
  styleUrls: ['./dialog-exam.component.css']
})
export class DialogExamComponent implements OnInit {

  facility: Facility[] = [];
  patient: Patient[] = [];
  doctor: Doctor[] = [];
  examtype: ExamType[] = [];
  insurance: Insurance[] = [];
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add exam";

  constructor(private patientService: PatientService,
    private facilityService: FacilityService,
    private doctorService: DoctorService,
    private examTypeService: ExamTypeService,
    private insuranceService: InsuranceService,
    private service : ExamService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogAppoitmentComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Exam ) { }

  ngOnInit(): void {
    
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update appoitment";
    }

    this.doctorService.getAllDoctors().subscribe(d =>
      this.doctor = d
    );

    this.examTypeService.getAllExamTypes().subscribe(et =>
      this.examtype = et
    );

    this.insuranceService.getAllInsurances().subscribe(i =>
      this.insurance = i
    );

    this.patientService.getAllPatients().subscribe(p =>
      this.patient = p
    );

    this.facilityService.getAllFacilities().subscribe(f =>
      this.facility = f
    );

  }

  public cancel(): void {
    this.dialogRef.close();
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public addExam(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        console.log(f.value);
        this.service.addExam(f.value)
        .subscribe({
          next: (res) => {
            this.notification.success(':: Added successfully');
            f.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Something went wrong");
          }
        })
      }
    } else {
      this.updateExam(f);
    }
  }

  public updateExam(f: NgForm) {
    this.currentid = this.editData.examid;
    let data = {
      examdate : f.value.examdate,
      roomnumber: f.value.roomnumber,
      doctor: f.value.doctor,
      examtype: f.value.examtype,
      insurance: f.value.insurance,
      patient: f.value.patient,
      facility: f.value.facility,
      examid : this.currentid
    }
    this.service.updateExam(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
