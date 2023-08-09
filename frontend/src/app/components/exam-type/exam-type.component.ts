import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExamType } from 'src/app/models/exam-type';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ExamTypeService } from 'src/app/services/exam-type.service';
import { DialogExamTypeComponent } from '../dialogs/dialog-exam-type/dialog-exam-type.component';

@Component({
  selector: 'app-exam-type',
  templateUrl: './exam-type.component.html',
  styleUrls: ['./exam-type.component.css']
})
export class ExamTypeComponent implements OnInit {

  displayedColumns: string[] = ['examtypeid', 'examtypename', 'action'];
  dataSource!: MatTableDataSource<ExamType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: ExamTypeService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllExamTypes();
  } 

  public getAllExamTypes() {
    this.service.getAllExamTypes().subscribe({
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
    const dialogRef = this.dialog.open(DialogExamTypeComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllExamTypes();
      }
        
    });
  }

  public editExamType(row: any) {
    this.dialog.open(DialogExamTypeComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllExamTypes();
      }
    })
  }

  public deleteExamType(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteExamType(row.examtypeid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllExamTypes();
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
