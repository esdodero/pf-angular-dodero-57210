import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../../models';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrl: './enrollment-dialog.component.scss'
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;

  constructor(
    private fb:FormBuilder, 
    private matDialogRef:MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingEnrollment?: Enrollment
  ){
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });

    if(this.editingEnrollment){
      this.enrollmentForm.patchValue(this.editingEnrollment);
    }
  }

  onSubmit(): void{
    if (this.enrollmentForm.valid) {
      this.matDialogRef.close(this.enrollmentForm.value);
    } else {
      /// mostar error
    }
  }
}
