import { Injectable } from "@angular/core";
import { Observable, of, delay } from "rxjs";
import { Enrollment } from "../../modules/dashboard/enrollments/models";

@Injectable({providedIn: "root"})

export class EnrollmentsService{
    private MY_DATABASE: Enrollment[] = [
        {
            studentId: "DHGR2",
            courseId: "GFTDR2"
        },
        {
            studentId: "ARFS3",
            courseId: "HGYT3"
        },
        {
            studentId: "HBST4",
            courseId: "AGVCR4"
        },
    ];

    getEnrollments(): Observable<Enrollment[]>{
        return of<Enrollment[]>(this.MY_DATABASE).pipe(delay(400));
    }

    addEnrollment(enrollment: Enrollment): Observable<Enrollment[]> {
        this.MY_DATABASE.push(enrollment);
        return this.getEnrollments();
    }

    deleteEnrollmentById(courseId: string): Observable<Enrollment[]> {
        this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.courseId != courseId);
        return this.getEnrollments();
    }

    editEnrollmentById(courseId: string, update: Enrollment) {
        this.MY_DATABASE = this.MY_DATABASE.map((el) =>
          el.courseId === courseId ? { ...update, courseId } : el
        );
        return this.getEnrollments();
      }
}