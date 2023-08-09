import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { NotificationService } from 'src/app/services/notification.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css']
})
export class DialogPatientComponent implements OnInit {
  
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add patient";

  constructor(private service: PatientService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Patient) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update patient";
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addPatient(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        this.service.addPatient(f.value)
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
      this.updatePatient(f);
    }
  }

  public updatePatient(f: NgForm) {
    this.currentid = this.editData.patientid;
    let data = {
      patientname : f.value.patientname,
      patientaddress: f.value.patientaddress,
      patientphonenumber: f.value.patientphonenumber,
      patientid: this.currentid
    }
    this.service.updatePatient(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
