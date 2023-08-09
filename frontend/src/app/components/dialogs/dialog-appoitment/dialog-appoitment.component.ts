import { Component, Inject, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/facility';
import { Patient } from 'src/app/models/patient';
import { AppoitmentService } from 'src/app/services/appoitment.service';
import { FacilityService } from 'src/app/services/facility.service';
import { PatientService } from 'src/app/services/patient.service';
import { DialogCityComponent } from '../dialog-city/dialog-city.component';
import { Appoitment } from 'src/app/models/appoitment';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-appoitment',
  templateUrl: './dialog-appoitment.component.html',
  styleUrls: ['./dialog-appoitment.component.css']
})
export class DialogAppoitmentComponent implements OnInit {

  facility: Facility[] = [];
  patient: Patient[] = [];
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add appoitment";

  constructor(private patientService: PatientService,
    private facilityService: FacilityService,
    private service : AppoitmentService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogAppoitmentComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Appoitment ) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update appoitment";
    }

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

  public addAppoitment(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        console.log(f.value);
        this.service.addAppoitment(f.value)
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
      this.updateAppoitment(f);
    }
  }

  public updateAppoitment(f: NgForm) {
    this.currentid = this.editData.appoitmentid;
    let data = {
      appoitmentdate : f.value.appoitmentdate,
      facility: f.value.facility,
      patient: f.value.patient,
      appoitmentid : this.currentid
    }
    this.service.updateAppoitment(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
