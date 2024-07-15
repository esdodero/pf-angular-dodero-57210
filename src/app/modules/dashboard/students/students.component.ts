import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { Student } from './model';
import { generateId } from '../../../shared/utils';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
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
  dataSource: Student[] = [
    {
      id: 'BH5V6',
      firstName: 'Clara',
      lastName: 'Kent',
      birthday: new Date(),
    },
    {
      id: 'HJI7FT',
      firstName: 'Carlos',
      lastName: 'Jerez',
      birthday: new Date(),
    },
    {
      id: 'HUG64',
      firstName: 'Ciro',
      lastName: 'Martinez',
      birthday: new Date(),
    },
  ];

  constructor(private matDialog: MatDialog){}
  student: string = '';


  openDialog(): void{
    this.matDialog
    .open(StudentDialogComponent)
    .afterClosed()
    .subscribe({
      next: (student) => {
        if(student){
          this.firstName = student.firstName;
          this.lastName = student.lastName;
          this.studentFullName = { firstName: this.firstName, lastName: this.lastName };
          student['id'] = generateId(5);
          this.dataSource = [...this.dataSource, student];
        }
      },
    });
  }

  editStudent(editingStudent: Student) {
    this.matDialog
      .open(StudentDialogComponent, {
        data: editingStudent,
      })
      .afterClosed()
      .subscribe({
        next: (value) => {

          if (!!value) {
            this.dataSource = this.dataSource.map((el) => 
              el.id === editingStudent.id 
            ? {...value, id: editingStudent.id} : el
            );
          }
        },
      });
  }

  deleteStudentById(id: string) {
    if(confirm("Esta seguro que desea eliminar el Alumno?")){
      this.dataSource = this.dataSource.filter((el) => el.id !== id);
    }
  }
}
