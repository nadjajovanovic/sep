import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Insurance } from 'src/app/models/insurance';
import { InsuranceService } from 'src/app/services/insurance.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-insurance',
  templateUrl: './dialog-insurance.component.html',
  styleUrls: ['./dialog-insurance.component.css']
})
export class DialogInsuranceComponent implements OnInit {
  
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add insurance";

  constructor(private service: InsuranceService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogInsuranceComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Insurance) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update insurance";
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addInsurance(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        this.service.addInsurance(f.value)
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
      this.updateInsurance(f);
    }
  }

  public updateInsurance(f: NgForm) {
    this.currentid = this.editData.insuranceid;
    let data = {
      insurancename : f.value.insurancename,
      insuranceid: this.currentid
    }
    this.service.updateInsurance(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
