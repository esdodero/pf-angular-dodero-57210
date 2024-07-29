import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeacherDialogComponent } from './component/teacher-dialog/teacher-dialog.component';


@NgModule({
  declarations: [
    TeachersComponent,
    TeacherDialogComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class TeachersModule { }
