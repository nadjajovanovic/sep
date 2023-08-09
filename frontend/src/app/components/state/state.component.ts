import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { State } from 'src/app/models/state';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StateService } from 'src/app/services/state.service';
import { DialogInsuranceComponent } from '../dialogs/dialog-insurance/dialog-insurance.component';
import { DialogStateComponent } from '../dialogs/dialog-state/dialog-state.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  displayedColumns: string[] = ['stateid', 'statename', 'action'];
  dataSource!: MatTableDataSource<State>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: StateService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllStates();
  } 

  public getAllStates() {
    this.service.getAllStates().subscribe({
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
    const dialogRef = this.dialog.open(DialogStateComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllStates();
      }
        
    });
  }

  public editState(row: any) {
    this.dialog.open(DialogStateComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllStates();
      }
    })
  }

  public deleteState(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteState(row.stateid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllStates();
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
