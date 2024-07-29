import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CoursesComponent } from './modules/dashboard/courses/courses.component';
import { EnrollmentsComponent } from './modules/dashboard/enrollments/enrollments.component';
import { StudentsComponent } from './modules/dashboard/students/students.component';
import { CourseDetailComponent } from './modules/dashboard/courses/pages/course-detail/course-detail.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { TeachersComponent } from './modules/dashboard/teachers/teachers.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        // /dashboard/courses
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'courses/:id',
        component: CourseDetailComponent,
      },
      {
        // /dashboard/courses
        path: 'teachers',
        component: TeachersComponent,
      },
      {
        path: 'enrollments',
        component: EnrollmentsComponent,
      },
      {
        path: '**', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
        redirectTo: '/dashboard/home',
      },
    ],
  },
  {
    path: '**', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
    redirectTo: '/auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
