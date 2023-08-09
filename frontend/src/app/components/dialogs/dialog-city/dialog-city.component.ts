import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/models/city';
import { Municipality } from 'src/app/models/municipality';
import { CityService } from 'src/app/services/city.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-city',
  templateUrl: './dialog-city.component.html',
  styleUrls: ['./dialog-city.component.css']
})
export class DialogCityComponent implements OnInit {
  municipality: Municipality[] = [];
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add city";

  constructor(private fkService: MunicipalityService,
    private service : CityService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogCityComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : City ) { }

  ngOnInit(): void {

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update city";
    }

    this.fkService.getAllMunicipalities().subscribe(m =>
      this.municipality = m
    );

  }

  public cancel(): void {
    this.dialogRef.close();
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public addCity(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        console.log(f.value);
        this.service.addCity(f.value)
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
      this.updateCity(f);
    }
  }

  public updateCity(f: NgForm) {
    this.currentid = this.editData.cityid;
    let data = {
      cityname : f.value.cityname,
      municipality: f.value.municipality,
      cityid : this.currentid
    }
    this.service.updateCity(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
