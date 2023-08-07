import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-doctor',
  templateUrl: './dialog-doctor.component.html',
  styleUrls: ['./dialog-doctor.component.css']
})
export class DialogDoctorComponent implements OnInit {

  doctor: Doctor[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add doctor";

  constructor(private service: DoctorService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Doctor) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      doctorname: ['', Validators.required],
      doctoraddress: ['', Validators.required],
      doctorphonenumber: ['', Validators.required],
      occupation: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update doctor";
      this.formValue.patchValue({
        doctorname: this.editData.doctorname,
        doctoraddress: this.editData.doctoraddress,
        doctorphonenumber: this.editData.doctorphonenumber,
        occupation: this.editData.occupation
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addDoctor() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addDoctor(this.formValue.value)
        .subscribe({
          next: (res) => {
            this.notification.success(':: Added successfully');
            this.formValue.reset();
            this.dialogRef.close('save');
            console.log(this.formValue);
          },
          error: () => {
            alert("Something went wrong");
          }
        })
      }
    } else {
      this.updateDoctor();
    }
  }

  public updateDoctor() {
    this.currentid = this.editData.doctorid;
    let data = {
      doctorname : this.formValue.value.doctorname,
      doctoraddress: this.formValue.value.doctoraddress,
      doctorphonenumber: this.formValue.value.doctorphonenumber,
      occupation: this.formValue.value.occupation,
      doctorid: this.currentid
    }
    console.log(data);
    console.log(this.currentid);
    this.service.updateDoctor(data)
    .subscribe(res => {
      console.log(res);
      
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
