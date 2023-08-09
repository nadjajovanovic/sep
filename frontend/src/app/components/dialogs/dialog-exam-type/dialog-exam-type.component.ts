import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamType } from 'src/app/models/exam-type';
import { ExamTypeService } from 'src/app/services/exam-type.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-exam-type',
  templateUrl: './dialog-exam-type.component.html',
  styleUrls: ['./dialog-exam-type.component.css']
})
export class DialogExamTypeComponent implements OnInit {
  
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add exam type";

  constructor(private service: ExamTypeService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogExamTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : ExamType) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update exam type";
      
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addExamType(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        this.service.addExamType(f.value)
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
      this.updateExamType(f);
    }
  }

  public updateExamType(f: NgForm) {
    this.currentid = this.editData.examtypeid;
    let data = {
      examtypename : f.value.examtypename,
      examtypeid: this.currentid
    }
    this.service.updateExamType(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
