import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Teacher } from "../../modules/dashboard/teachers/models";

@Injectable({providedIn: 'root'})

export class TeachersService{
    private MY_DATABASE = [
        {
          id: 'BH5V6',
          firstName: 'Clara',
          lastName: 'Kent',
          startDay: new Date(),
        },
        {
          id: 'HJI7FT',
          firstName: 'Carlos',
          lastName: 'Jerez',
          startDay: new Date(),
        },
        {
          id: 'HUG64',
          firstName: 'Ciro',
          lastName: 'Martinez',
          startDay: new Date(),
        },
      ];
    
      editTeacherById(id: string, update: Teacher) {
        this.MY_DATABASE = this.MY_DATABASE.map((el) =>
          el.id === id ? { ...update, id } : el
        );
        return this.getTeachers();
      }
    
      getTeachers(): Observable<Teacher[]> {
        return new Observable((observer) => {
          setTimeout(() => {
            observer.next(this.MY_DATABASE);
            observer.complete();
          }, 500);
        });
      }
    
      addTeacher(teacher: Teacher): Observable<Teacher[]> {
        this.MY_DATABASE.push(teacher);
        return this.getTeachers();
      }
    
      deleteTeacherById(id: string): Observable<Teacher[]> {
        this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
        return this.getTeachers();
      }
}