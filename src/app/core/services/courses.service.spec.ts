import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { CoursesService } from './courses.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Course } from '../../modules/dashboard/courses/models';

fdescribe('CoursesService', () => {
  let service: CoursesService;
  let router: Router;

  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProvider(Router)],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CoursesService);
    router = TestBed.inject(Router);
  });

  it('Al llamar get courses se debe ejecutar una peticion HTTP a /courses', () => {
    const mockedResponse: Course[] = [
      {
        id: "GDHHH",
        name: "Angular",
        startDate: new Date,
        endDate: new Date
      }
    ];

    service.getCourses().subscribe({
      next: (res) => {
        expect(res).toEqual(mockedResponse);
      },
    });

    httpController
      .expectOne({
        url: environment.apiUrl + '/courses',
        method: 'GET',
      })
      .flush(mockedResponse);
  });
});