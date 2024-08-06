import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Course } from "../../modules/dashboard/courses/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class CoursesService{

      constructor( public  httpClient: HttpClient){}
    
      editCourseById(id: string, update: Course) {
        return this.httpClient.put(environment.apiUrl + "/courses/" + id, update);
      }
    
      getCourses(): Observable<Course[]> {
        return this.httpClient.get<Course[]>(environment.apiUrl + "/courses");
      }

      getCourseById(id: string): Observable<Course | undefined> {
        return this.getCourses().pipe(
          map((allCourses) => allCourses.find((course) => course.id === id))
        );
      }
    
      addCourse(course: Course) {
        return this.httpClient.post(environment.apiUrl + "/courses", course);
      }
    
      deleteCourseById(id: string) {
        return this.httpClient.delete(environment.apiUrl + "/courses/" + id);
      }
}