import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../models/Student";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
    selector: "add-student-dialog",
    templateUrl: "./add-student-dialog.component.html"
})

export class AddStudentDialogComponent implements OnInit{

    student: Student;
    studentForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>) {
        this.student = new Student(0, "", "", 0, []);
    }

    ngOnInit(): void {
        this.studentForm = new FormGroup({
            firstName: new FormControl('',
                [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
            lastName: new FormControl('',
                [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
            age: new FormControl('',
                [Validators.required, Validators.min(18), Validators.max(100)])
        });
    }

    fieldErrors(field: string): ValidationErrors | null{
        let fieldState = this.studentForm.controls[field];
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    hasFormErrors(): boolean {
        return this.studentForm.invalid;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddClick(): void {
        this.dialogRef.close(this.student);
    }
}
