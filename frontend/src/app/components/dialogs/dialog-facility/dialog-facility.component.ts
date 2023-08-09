import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/models/city';
import { Facility } from 'src/app/models/facility';
import { CityService } from 'src/app/services/city.service';
import { FacilityService } from 'src/app/services/facility.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-facility',
  templateUrl: './dialog-facility.component.html',
  styleUrls: ['./dialog-facility.component.css']
})
export class DialogFacilityComponent implements OnInit {
  city: City[] = [];
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add facility";

  constructor(private fkService: CityService,
    private service : FacilityService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Facility ) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update facility";
    }

    this.fkService.getAllCities().subscribe(city =>
      this.city = city
    );

  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addFacility(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        this.service.addFacility(f.value)
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
      this.updateFacility(f);
    }
  }

  public updateFacility(f: NgForm) {
    this.currentid = this.editData.facilityid;
    let data = {
      facilityaddress : f.value.facilityaddress,
      facilitycontact: f.value.facilitycontact,
      facilityname: f.value.facilityname,
      city: f.value.city,
      facilityid : this.currentid
    }
    this.service.updateFacility(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
