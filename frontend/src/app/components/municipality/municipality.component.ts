import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Municipality } from 'src/app/models/municipality';
import { DialogService } from 'src/app/services/dialog.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogMunicipalityComponent } from '../dialogs/dialog-municipality/dialog-municipality.component';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.css']
})
export class MunicipalityComponent implements OnInit {
  displayedColumns: string[] = ['municipalityid', 'municipalityname', 'state', 'action'];
  dataSource!: MatTableDataSource<Municipality>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: MunicipalityService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getAllMunicipalities();
  } 
  
  getAllMunicipalities() {
   this.service.getAllMunicipalities().subscribe({
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
    const dialogRef = this.dialog.open(DialogMunicipalityComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllMunicipalities();
      }
        
    });
  }

  editMunicipality(row: any) {
    this.dialog.open(DialogMunicipalityComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllMunicipalities();
      }
    })
  }

  deleteMunicipality(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteMunicipality(row.municipalityid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllMunicipalities();
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
