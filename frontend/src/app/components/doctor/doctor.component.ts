import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/models/doctor';
import { DialogService } from 'src/app/services/dialog.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogDoctorComponent } from '../dialogs/dialog-doctor/dialog-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  p: number = 1;
  searchedKeyword: string;
  displayedColumns: string[] = ['doctorid', 'doctorname', 'doctoraddress', 'doctorphonenumber', 'occupation', 'action'];
  dataSource!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: DoctorService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  } 

  getAllDoctors() {
    this.service.getAllDoctors().subscribe({
      next: (res) => {
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
    const dialogRef = this.dialog.open(DialogDoctorComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllDoctors();
      }
        
    });
  }

  editDoctor(row: any) {
    this.dialog.open(DialogDoctorComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllDoctors();
      }
    })
  }

  deleteDoctor(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteDoctor(row.doctorid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllDoctors();
          }
        )
        console.log(res);
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
