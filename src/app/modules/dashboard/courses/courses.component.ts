import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { Course } from './models';
import { generateId } from '../../../shared/utils';
import { CoursesService } from '../../../core/services/courses.service';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  nombreCurso="";

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  dataSource: Course[] = [];

  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.dataSource = courses;
      },
      error: (error) => {
        console.log(error);
        if( error instanceof HttpErrorResponse){
          if(error.status === 404){
            console.log("cursos no encontrados");
          }
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }


  openDialog(): void{
    this.matDialog.open(CourseDialogComponent).afterClosed().subscribe({
      next: (value) => {
        this.nombreCurso = value.name;
        value['id'] = generateId(5);

        this.isLoading = true;
        this.coursesService
        .addCourse(value)
        .pipe(tap(()=> {
          this.loadCourses();
          this.isLoading = false;
        }))
        .subscribe();
      },
    });
  }

  editCourse(editingCourse: Course){
    this.matDialog.open(CourseDialogComponent, {data: editingCourse}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.coursesService
              .editCourseById(editingCourse.id, value)
              .pipe(tap(()=> this.loadCourses()))
              .subscribe();
        }
      },
    });
  }

  deleteCourseById(id: string){
    if(confirm('Desea eliminar el curso?')){
      this.isLoading = true;
      //implementamos un pipe, para que la recarga de los cursos suceda despues de la eliminacion
      this.coursesService
        .deleteCourseById(id)
        .pipe(tap(() => {
          this.loadCourses(),
          this.isLoading = false
        }))
        .subscribe();
    }
  }
}