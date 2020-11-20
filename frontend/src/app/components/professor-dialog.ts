import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {OnInit} from "@angular/core";
import {Professor} from "../models/Professor";

export abstract class ProfessorDialog implements OnInit {

    professorForm: FormGroup;
    professor: Professor;

    protected constructor() {
        this.professor = new Professor(0, "", 0, []);
    }

    ngOnInit(): void {
        this.professorForm = new FormGroup({
            name: new FormControl('',
                [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
            age: new FormControl('',
                [Validators.required, Validators.min(18), Validators.max(100)])
        });
    }

    fieldErrors(field: string): ValidationErrors | null {
        let fieldState = this.professorForm.controls[field];
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    hasFormErrors(): boolean {
        return this.professorForm.invalid;
    }
}