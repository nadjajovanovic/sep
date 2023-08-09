import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam';
import { DialogService } from 'src/app/services/dialog.service';
import { ExamService } from 'src/app/services/exam.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogAppoitmentComponent } from '../dialogs/dialog-appoitment/dialog-appoitment.component';
import { DialogExamComponent } from '../dialogs/dialog-exam/dialog-exam.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  displayedColumns: string[] = ['examid', 'examdate', 'roomnumber', 'doctor', 'examtype', 'insurance', 'patient', 'facility', 'action'];
  dataSource!: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: ExamService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllExams();
  } 
  
  getAllExams() {
   this.service.getAllExams().subscribe({
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
    const dialogRef = this.dialog.open(DialogExamComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllExams();
      }
        
    });
  }

  editExam(row: any) {
    this.dialog.open(DialogExamComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllExams();
      }
    })
  }

  deleteExam(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteExam(row.examid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllExams();
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
