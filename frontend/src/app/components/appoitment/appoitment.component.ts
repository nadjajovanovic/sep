import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appoitment } from 'src/app/models/appoitment';
import { AppoitmentService } from 'src/app/services/appoitment.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogAppoitmentComponent } from '../dialogs/dialog-appoitment/dialog-appoitment.component';

@Component({
  selector: 'app-appoitment',
  templateUrl: './appoitment.component.html',
  styleUrls: ['./appoitment.component.css']
})
export class AppoitmentComponent implements OnInit {
  displayedColumns: string[] = ['appoitmentid', 'appoitmentdate', 'facility', 'patient', 'action'];
  dataSource!: MatTableDataSource<Appoitment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: AppoitmentService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllAppoitments();
  } 
  
  getAllAppoitments() {
   this.service.getAllAppoitments().subscribe({
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
    const dialogRef = this.dialog.open(DialogAppoitmentComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllAppoitments();
      }
        
    });
  }

  editAppoitment(row: any) {
    this.dialog.open(DialogAppoitmentComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllAppoitments();
      }
    })
  }

  deleteAppoitment(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteAppoitment(row.appoitmentid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllAppoitments();
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
