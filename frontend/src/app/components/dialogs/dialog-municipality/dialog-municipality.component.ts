import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Municipality } from 'src/app/models/municipality';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dialog-municipality',
  templateUrl: './dialog-municipality.component.html',
  styleUrls: ['./dialog-municipality.component.css']
})
export class DialogMunicipalityComponent implements OnInit {
  states: any[] = [];
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add municipality";

  constructor(private fkService: StateService,
    private service : MunicipalityService,
    private notification : NotificationService,
    private dialogRef : MatDialogRef<DialogMunicipalityComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Municipality ) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update municipality";
    }

    this.fkService.getAllStates().subscribe(state =>
      this.states = state
    );

  }

  public cancel(): void {
    this.dialogRef.close();
  }
  
  public addMunicipality(f: NgForm) {
    if(!this.editData) {
      if(f.valid) {
        this.service.addMunicipality(f.value)
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
    this.currentid = this.editData.municipalityid;
    let data = {
      municipalityname : f.value.municipalityname,
      state: f.value.state,
      municipalityid : this.currentid
    }
    this.service.updateMunicipality(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      f.reset();
      this.dialogRef.close('update');
    });
  }
}
