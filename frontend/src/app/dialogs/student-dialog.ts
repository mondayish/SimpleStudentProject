import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Directive, OnInit} from "@angular/core";
import {Student} from "../models/Student";

@Directive()

export abstract class StudentDialog implements OnInit {

    student: Student;
    studentForm: FormGroup;

    protected constructor() {
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

    fieldErrors(field: string): ValidationErrors | null {
        let fieldState = this.studentForm.controls[field];
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    hasFormErrors(): boolean {
        return this.studentForm.invalid;
    }
}
