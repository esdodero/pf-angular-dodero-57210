import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    CommonModule,
    MatDialogModule,
    SharedModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    EnrollmentsComponent
  ]
})
export class EnrollmentsModule { }
