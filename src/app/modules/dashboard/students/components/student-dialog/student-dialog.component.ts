import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../model';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb:FormBuilder, 
    private matDialogRef:MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingStudent?: Student
  ){
    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthday: [null, Validators.required],
    });

    if(this.editingStudent){
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  onSubmit(): void{
    if (this.studentForm.valid) {
      this.matDialogRef.close(this.studentForm.value);
    } else {
      /// mostar error
    }
  }
}
