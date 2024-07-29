import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { Student } from './models';
import { generateId } from '../../../shared/utils';
import { StudentsService } from '../../../core/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  firstName: string = "John";
  lastName: string = "Doe";
  fechaInicio: string = "";
  studentFullName = { firstName: 'John', lastName: 'Doe' };

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'birthday',
    'actions',
  ];
  dataSource: Student[] = [];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {}
  student: string = '';

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents() {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (Students) => {
        this.dataSource = Students;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void{
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.studentFullName = { firstName: this.firstName, lastName: this.lastName };
        value['id'] = generateId(5);

        this.isLoading = true;
        this.studentsService.addStudent(value).subscribe({
          next: (students) => {
            this.dataSource = [...students];
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      },
    });
  }

  editStudent(editingStudent: Student){
    this.matDialog.open(StudentDialogComponent, {data: editingStudent}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.studentsService
              .editStudentById(editingStudent.id, value)
              .subscribe({
                next: (students) => {
                  this.dataSource = [...students];
                },
              });
        }
      },
    });
  }

  deleteStudentById(id: string){
    if(confirm('Desea eliminar el estudiante?')){
      this.isLoading = true;

      this.studentsService.deleteStudentById(id).subscribe({
        next: (students) => {
          this.dataSource = [...students];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

}
