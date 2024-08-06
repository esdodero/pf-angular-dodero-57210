import { Component, OnInit } from '@angular/core';
import { EnrollmentsService } from '../../../core/services/enrollments.services';
import { finalize, Observable, tap } from 'rxjs';
import { Enrollment } from './models';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  isLoading = true;
  studentId: string = "";
  courseId: string = "";
  dataSource: Enrollment[] = [];
  displayedColumns: string[] = ['courseId', 'studentId', 'actions'];

  constructor( 
    private matDialog: MatDialog,
    private enrollmentsService: EnrollmentsService)
  {
    /*this.enrollmentsService.getEnrollments().subscribe({
      next: (enrollments) => (this.dataSource = enrollments),
      complete: () => (this.isLoading = false)
    });*/
  }

  ngOnInit(): void {
    this.loadEnrollments();
  }
  loadEnrollments() {
    this.isLoading = true;
    this.enrollmentsService.getEnrollments().subscribe({
      next: (enrollments) => {
        this.dataSource = enrollments;
      },
      error: (error) => {
        if( error instanceof HttpErrorResponse){
          console.log(error);
          if(error.status === 404){
            console.log("Inscripciones no encontradas");
          }
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void{
    this.matDialog.open(EnrollmentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        this.courseId = value.courseId;
        this.studentId = value.studentId;

        this.isLoading = true;
        this.enrollmentsService
        .addEnrollment(value)
        .pipe(tap(()=>{
          this.loadEnrollments();
          this.isLoading = false;
        }))
        .subscribe();
      },
    });
  }

  editEnrollment(editingEnrollment: Enrollment){
    this.matDialog.open(EnrollmentDialogComponent, {data: editingEnrollment}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.enrollmentsService
              .editEnrollmentById(editingEnrollment.courseId, value)
              .pipe(tap(()=> this.loadEnrollments()))
              .subscribe();
        }
      },
    });
  }

  deleteEnrollmentById(id: string){
    if(confirm('Desea eliminar la inscripcion?')){
      this.isLoading = true;

      this.enrollmentsService
      .deleteEnrollmentById(id)
      .pipe(tap(() => {
        this.loadEnrollments(),
        this.isLoading = false
      }))
      .subscribe();
    }
  }

}
