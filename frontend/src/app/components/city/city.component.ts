import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogMunicipalityComponent } from '../dialogs/dialog-municipality/dialog-municipality.component';
import { DialogCityComponent } from '../dialogs/dialog-city/dialog-city.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  displayedColumns: string[] = ['cityid', 'cityname', 'municipality', 'action'];
  dataSource!: MatTableDataSource<City>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: CityService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getAllCities();
  } 
  
  public getAllCities() {
   this.service.getAllCities().subscribe({
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
    const dialogRef = this.dialog.open(DialogCityComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllCities();
      }
        
    });
  }

  editCity(row: any) {
    this.dialog.open(DialogCityComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllCities();
      }
    })
  }

  deleteCity(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteCity(row.cityid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllCities();
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
