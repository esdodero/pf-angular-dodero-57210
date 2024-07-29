import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../models';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrl: './teacher-dialog.component.scss'
})
export class TeacherDialogComponent {
  teacherForm: FormGroup;

  constructor(
    private fb:FormBuilder, 
    private matDialogRef:MatDialogRef<TeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingTeacher?: Teacher
  ){
    this.teacherForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      startDay: [null, Validators.required],
    });

    if(this.editingTeacher){
      this.teacherForm.patchValue(this.editingTeacher);
    }
  }

  onSubmit(): void{
    if (this.teacherForm.valid) {
      this.matDialogRef.close(this.teacherForm.value);
    } else {
      /// mostar error
    }
  }
}
