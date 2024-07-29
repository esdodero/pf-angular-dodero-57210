import { Component } from '@angular/core';
import { EnrollmentsService } from '../../../core/services/enrollments.services';
import { finalize, Observable } from 'rxjs';
import { Enrollment } from './models';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent {
  isLoading = true;
  studentId: string = "";
  courseId: string = "";
  dataSource: Enrollment[] = [];
  displayedColumns: string[] = ['courseId', 'studentId', 'actions'];

  constructor( 
    private matDialog: MatDialog,
    private enrollmentsService: EnrollmentsService)
  {
    this.enrollmentsService.getEnrollments().subscribe({
      next: (enrollments) => (this.dataSource = enrollments),
      complete: () => (this.isLoading = false)
    });
  }

  openDialog(): void{
    this.matDialog.open(EnrollmentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        this.courseId = value.courseId;
        this.studentId = value.studentId;

        this.isLoading = true;
        this.enrollmentsService.addEnrollment(value).subscribe({
          next: (enrollments) => {
            this.dataSource = [...enrollments];
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      },
    });
  }

  editEnrollment(editingEnrollment: Enrollment){
    this.matDialog.open(EnrollmentDialogComponent, {data: editingEnrollment}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.enrollmentsService
              .editEnrollmentById(editingEnrollment.courseId, value)
              .subscribe({
                next: (enrollments) => {
                  this.dataSource = [...enrollments];
                },
              });
        }
      },
    });
  }

  deleteEnrollmentById(id: string){
    if(confirm('Desea eliminar la inscripcion?')){
      this.isLoading = true;

      this.enrollmentsService.deleteEnrollmentById(id).subscribe({
        next: (enrollments) => {
          this.dataSource = [...enrollments];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

}
