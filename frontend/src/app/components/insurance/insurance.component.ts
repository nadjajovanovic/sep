import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Insurance } from 'src/app/models/insurance';
import { DialogService } from 'src/app/services/dialog.service';
import { InsuranceService } from 'src/app/services/insurance.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogInsuranceComponent } from '../dialogs/dialog-insurance/dialog-insurance.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  displayedColumns: string[] = ['insuranceid', 'insurancename', 'action'];
  dataSource!: MatTableDataSource<Insurance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: InsuranceService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllInsurances();
  } 

  public getAllInsurances() {
    this.service.getAllInsurances().subscribe({
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
    const dialogRef = this.dialog.open(DialogInsuranceComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllInsurances();
      }
        
    });
  }

  public editInsurance(row: any) {
    this.dialog.open(DialogInsuranceComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllInsurances();
      }
    })
  }

  public deleteInsurance(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteInsurance(row.insuranceid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllInsurances();
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
