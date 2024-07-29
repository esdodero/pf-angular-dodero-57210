import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import {MatListModule} from '@angular/material/list';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SharedModule } from '../../shared/shared.module';
import { TeachersModule } from './teachers/teachers.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    StudentsModule,
    CoursesModule,
    MatListModule,
    EnrollmentsModule,
    SharedModule,
    TeachersModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
