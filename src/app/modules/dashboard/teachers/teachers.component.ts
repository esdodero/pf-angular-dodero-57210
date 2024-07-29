import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from './component/teacher-dialog/teacher-dialog.component';
import { Teacher } from './models';
import { generateId } from '../../../shared/utils';
import { TeachersService } from '../../../core/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  firstName: string = "";
  lastName: string = "";
  startDay: string = "";
  teacherFullName = { firstName: '', lastName: '' };

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'startDay',
    'actions',
  ];
  dataSource: Teacher[] = [];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private teachersService: TeachersService
  ) {}
  teacher: string = '';

  ngOnInit(): void {
    this.loadTeachers();
  }
  loadTeachers() {
    this.isLoading = true;
    this.teachersService.getTeachers().subscribe({
      next: (Teachers) => {
        this.dataSource = Teachers;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void{
    this.matDialog.open(TeacherDialogComponent).afterClosed().subscribe({
      next: (value) => {
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.teacherFullName = { firstName: this.firstName, lastName: this.lastName };
        value['id'] = generateId(5);

        this.isLoading = true;
        this.teachersService.addTeacher(value).subscribe({
          next: (teachers) => {
            this.dataSource = [...teachers];
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      },
    });
  }

  editTeacher(editingTeacher: Teacher){
    this.matDialog.open(TeacherDialogComponent, {data: editingTeacher}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.teachersService
              .editTeacherById(editingTeacher.id, value)
              .subscribe({
                next: (teachers) => {
                  this.dataSource = [...teachers];
                },
              });
        }
      },
    });
  }

  deleteTeacherById(id: string){
    if(confirm('Desea eliminar el estudiante?')){
      this.isLoading = true;

      this.teachersService.deleteTeacherById(id).subscribe({
        next: (teachers) => {
          this.dataSource = [...teachers];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

}
