import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Facility } from 'src/app/models/facility';
import { DialogService } from 'src/app/services/dialog.service';
import { FacilityService } from 'src/app/services/facility.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogCityComponent } from '../dialogs/dialog-city/dialog-city.component';
import { DialogFacilityComponent } from '../dialogs/dialog-facility/dialog-facility.component';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {

  displayedColumns: string[] = ['facilityid', 'facilityname', 'facilityaddress', 'facilitycontact', 'city','action'];
  dataSource!: MatTableDataSource<Facility>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: FacilityService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getAllFacilities();
  } 
  
  public getAllFacilities() {
   this.service.getAllFacilities().subscribe({
     next:(res) => {
       this.dataSource = new MatTableDataSource(res);

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
     error: (err) => {
       alert("Error while fetching data");
     }
   })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFacilityComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllFacilities();
      }
        
    });
  }

  editFacility(row: any) {
    this.dialog.open(DialogFacilityComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllFacilities();
      }
    })
  }

  deleteFacility(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteFacility(row.facilityid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllFacilities();
          }
        )
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
