import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../../modules/dashboard/students/models";

@Injectable({providedIn: 'root'})

export class StudentsService{
    private MY_DATABASE = [
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
    
      editStudentById(id: string, update: Student) {
        this.MY_DATABASE = this.MY_DATABASE.map((el) =>
          el.id === id ? { ...update, id } : el
        );
        return this.getStudents();
      }
    
      getStudents(): Observable<Student[]> {
        return new Observable((observer) => {
          setTimeout(() => {
            observer.next(this.MY_DATABASE);
            observer.complete();
          }, 500);
        });
      }
    
      addStudent(student: Student): Observable<Student[]> {
        this.MY_DATABASE.push(student);
        return this.getStudents();
      }
    
      deleteStudentById(id: string): Observable<Student[]> {
        this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
        return this.getStudents();
      }
}