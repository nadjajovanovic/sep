import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { State } from 'src/app/models/state';
import { NotificationService } from 'src/app/services/notification.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dialog-state',
  templateUrl: './dialog-state.component.html',
  styleUrls: ['./dialog-state.component.css']
})
export class DialogStateComponent implements OnInit {
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add state";

  constructor(private service: StateService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogStateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : State) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update exam type";
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addState(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        this.service.addState(f.value)
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
      this.updateState(f);
    }
  }

  public updateState(f: NgForm) {
    this.currentid = this.editData.stateid;
    let data = {
      statename : f.value.statename,
      stateid: this.currentid
    }
    this.service.updateState(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
