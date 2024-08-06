import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Student } from "../../modules/dashboard/students/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class StudentsService{
  constructor( public  httpClient: HttpClient){}
    
      editStudentById(id: string, update: Student) {
        return this.httpClient.put(environment.apiUrl + "/students/" + id, update);
      }
    
      getStudents(): Observable<Student[]> {
        return this.httpClient.get<Student[]>(environment.apiUrl + "/students");
      }

      getStudentById(id: string): Observable<Student | undefined> {
        return this.getStudents().pipe(
          map((allStudents) => allStudents.find((student) => student.id === id))
        );
      }
    
      addStudent(student: Student) {
        return this.httpClient.post(environment.apiUrl + "/students", student);
      }
    
      deleteStudentById(id: string) {
        return this.httpClient.delete(environment.apiUrl + "/students/" + id);
      }
}