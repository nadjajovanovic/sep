import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamType } from 'src/app/models/exam-type';
import { ExamTypeService } from 'src/app/services/exam-type.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';

@Component({
  selector: 'app-dialog-exam-type',
  templateUrl: './dialog-exam-type.component.html',
  styleUrls: ['./dialog-exam-type.component.css']
})
export class DialogExamTypeComponent implements OnInit {

  doctor: ExamType[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add exam type";

  constructor(private service: ExamTypeService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogExamTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : ExamType) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      examtypename: ['', Validators.required],
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update exam type";
      this.formValue.patchValue({
        examtypename: this.editData.examtypename
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addPatient() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addExamType(this.formValue.value)
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
    this.currentid = this.editData.examtypeid;
    let data = {
      examtypename : this.formValue.value.examtypename,
      examtypeid: this.currentid
    }
    this.service.updateExamType(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }


}
