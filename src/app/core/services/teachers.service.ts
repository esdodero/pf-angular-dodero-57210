import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Teacher } from "../../modules/dashboard/teachers/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class TeachersService{
    
      constructor( public  httpClient: HttpClient){}
    
      editTeacherById(id: string, update: Teacher) {
        return this.httpClient.put(environment.apiUrl + "/teachers/" + id, update);
      }
    
      getTeachers(): Observable<Teacher[]> {
        return this.httpClient.get<Teacher[]>(environment.apiUrl + "/teachers");
      }

      getTeacherById(id: string): Observable<Teacher | undefined> {
        return this.getTeachers().pipe(
          map((allTeachers) => allTeachers.find((teacher) => teacher.id === id))
        );
      }
    
      addTeacher(teacher: Teacher) {
        return this.httpClient.post(environment.apiUrl + "/teachers", teacher);
      }
    
      deleteTeacherById(id: string) {
        return this.httpClient.delete(environment.apiUrl + "/teachers/" + id);
      }
}