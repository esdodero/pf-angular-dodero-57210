import { Injectable } from "@angular/core";
import { Observable, of, delay } from "rxjs";
import { Enrollment } from "../../modules/dashboard/enrollments/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: "root"})

export class EnrollmentsService{

    constructor( private hhtpClient: HttpClient){}

    getEnrollments(): Observable<Enrollment[]>{
        return this.hhtpClient.get<Enrollment[]>(environment.apiUrl + "/enrollments");
    }

    addEnrollment(enrollment: Enrollment) {
        return this.hhtpClient.post(environment.apiUrl + "/enrollments", enrollment);
    }

    deleteEnrollmentById(courseId: string) {
        return this.hhtpClient.delete(environment.apiUrl + "/enrollments/" + courseId);
    }

    editEnrollmentById(courseId: string, update: Enrollment) {
        return this.hhtpClient.put(environment.apiUrl + "/enrollments/" + courseId, update);
    }
}