import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
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
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add doctor";

  constructor(private service: DoctorService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Doctor ) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update municipality";
      
      
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
  
  public addDoctor(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        console.log(f.value);
        this.service.addDoctor(f.value)
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
      this.updateMuniciplaity(f);
    }
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public updateMuniciplaity(f: NgForm) {
    this.currentid = this.editData.doctorid;
    let data = {
      doctorname : f.value.doctorname,
      doctoraddress: f.value.doctoraddress,
      doctorphonenumber: f.value.doctorphonenumber,
      occupation: f.value.occupation,
      doctorid: this.currentid
    }
    console.log(data);
    console.log(this.currentid);
    this.service.updateDoctor(data)
    .subscribe(res => {
      console.log(res);
      
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
