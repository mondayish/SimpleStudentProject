import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Directive, OnInit} from "@angular/core";
import {Professor} from "../models/Professor";
import {SubjectService} from "../services/subject.service";
import {ServiceLocator} from "../services/ServiceLocator";
import {Subject} from "../models/Subject";

@Directive()

export abstract class ProfessorDialog implements OnInit {

    professorForm: FormGroup;
    professor: Professor;
    allSubjects: Subject[];

    private subjectService: SubjectService = ServiceLocator.injector.get(SubjectService);


    protected constructor() {
        this.professor = new Professor(0, "", 0, []);
    }

    ngOnInit(): void {
        this.subjectService.getAllSubject().subscribe((data: Subject[]) => this.allSubjects = data);

        this.professorForm = new FormGroup({
            name: new FormControl('',
                [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
            age: new FormControl('',
                [Validators.required, Validators.min(18), Validators.max(100)]),
            subjects: new FormControl(this.professor.subjects)
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
