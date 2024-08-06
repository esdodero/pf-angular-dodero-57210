import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './courses/pages/course-detail/course-detail.component';
import { TeachersComponent } from './teachers/teachers.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => 
      import('./home/home.module').then(
      (refFile) => refFile.HomeModule
    ),
  },
  {
    path: 'students',
    loadChildren: () => 
      import('./students/students.module').then(
      (refFile) => refFile.StudentsModule
    ),
  },
  {
    // /dashboard/courses
    path: 'courses',
    loadChildren: () => 
      import('./courses/courses.module').then(
      (refFile) => refFile.CoursesModule
    ),
  },
  {
    // /dashboard/courses
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(
      (refFile) => refFile.TeachersModule
    ),
  },
  {
    path: 'enrollments',
    canActivate: [adminGuard],
    loadChildren: () => import('./enrollments/enrollments.module').then(
      (refFile) => refFile.EnrollmentsModule 
    ),
  },
  {
    path: '**', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
    redirectTo: '/dashboard/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
