import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  doctor: Patient[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add patient";

  constructor(private service: PatientService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Patient) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      patientname: ['', Validators.required],
      patientaddress: ['', Validators.required],
      patientphonenumber: ['', Validators.required],
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update patient";
      this.formValue.patchValue({
        patientname: this.editData.patientname,
        patientaddress: this.editData.patientaddress,
        patientphonenumber: this.editData.patientphonenumber
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addPatient() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addPatient(this.formValue.value)
        .subscribe({
          next: (res) => {
            this.notification.success(':: Added successfully');
            this.formValue.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Something went wrong");
          }
        })
      }
    } else {
      this.updatePatient();
    }
  }

  public updatePatient() {
    this.currentid = this.editData.patientid;
    let data = {
      patientname : this.formValue.value.patientname,
      patientaddress: this.formValue.value.patientaddress,
      patientphonenumber: this.formValue.value.patientphonenumber,
      patientid: this.currentid
    }
    this.service.updatePatient(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }


}
