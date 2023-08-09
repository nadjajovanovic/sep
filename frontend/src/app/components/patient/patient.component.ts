import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogDoctorComponent } from '../dialogs/dialog-doctor/dialog-doctor.component';
import { PatientService } from 'src/app/services/patient.service';
import { DialogPatientComponent } from '../dialogs/dialog-patient/dialog-patient.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  displayedColumns: string[] = ['patientid', 'patientname', 'patientaddress', 'patientphonenumber', 'action'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: PatientService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllPatients();
  } 

  public getAllPatients() {
    this.service.getAllPatients().subscribe({
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

  public openDialog() {
    const dialogRef = this.dialog.open(DialogPatientComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllPatients();
      }
        
    });
  }

  public editPatient(row: any) {
    this.dialog.open(DialogPatientComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllPatients();
      }
    })
  }

  public deletePatient(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deletePatient(row.patientid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllPatients();
          }
        )
      }
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
