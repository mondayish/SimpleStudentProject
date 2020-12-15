import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Student} from "../../models/Student";
import {Mark} from "../../models/Mark";
import {MarksStorage} from "../../models/MarksStorage";
import {MatTable} from "@angular/material/table";
import {StudentService} from "../../services/student.service";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/Subject";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
    selector: 'marks-app',
    templateUrl: './marks.component.html'
})

export class MarksComponent implements OnInit, OnChanges {

    @Input() student: Student;
    @Input() existingSubjects: Subject[];
    @ViewChild(MatTable) table: MatTable<Mark>;
    @Output() onAddNewSubject: EventEmitter<Subject> = new EventEmitter<Subject>();

    displayedMarkColumns: string[] = ['point', 'date'];
    maxDate: Date = new Date();
    markPoints: number[] = [2, 3, 4, 5];
    markToAdd: Mark = new Mark(0, 5, new Date());
    selectedMarksStorage: MarksStorage;

    // todo write more comments or documentation...
    // todo refactoring

    isSuccessfulSave: boolean;
    isNeedToAddSubject: boolean = false;
    selectedSubject: Subject;

    subjectForm: FormGroup;
    subjectToAdd: Subject = new Subject(0, '', '', null, null);

    constructor(private studentService: StudentService, private subjectService: SubjectService) {
    }

    ngOnChanges(): void {
        this.filterExistingSubjects();
    }

    ngOnInit(): void {
        const markStorages: MarksStorage[] = this.student.marksStorages;
        this.selectedMarksStorage = markStorages.length > 0 ? markStorages[0] : null;

        this.subjectForm = new FormGroup({
            name: new FormControl('',
                [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
            description: new FormControl('',
                [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
        });
    }

    getBeautifulDate(date: Date | string | null): string {
        return date === null ? "" : new Date(date).toLocaleDateString('ru-RU');
    }

    fieldErrors(formControlName: string): ValidationErrors | null {
        const fieldState = this.subjectForm.controls[formControlName];
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    onAddMarkClick(): void {
        const markCopy: Mark = new Mark(this.markToAdd.id, this.markToAdd.point, this.dateCorrector(this.markToAdd.date));
        this.selectedMarksStorage.marks.push(markCopy);
        this.table.renderRows();
        console.log(markCopy);
    }

    onSaveChangesClick(): void {
        this.studentService.updateStudent(this.student).subscribe(
            data => this.isSuccessfulSave = true,
            error => this.isSuccessfulSave = false
        );
    }

    toggleIsNeedToAddSubject() {
        this.isNeedToAddSubject = !this.isNeedToAddSubject;
    }

    onAddExistingClick(): void {
        this.student.marksStorages.push(new MarksStorage(0, [], null, this.selectedSubject));
        this.filterExistingSubjects();
        this.isNeedToAddSubject = false;
    }

    onAddNewClick(): void {
        this.subjectService.createSubject(this.subjectToAdd).subscribe((createdSubject: Subject) => {
            this.onAddNewSubject.emit(createdSubject);
            this.student.marksStorages.push(new MarksStorage(0, [], null, createdSubject));
            this.isNeedToAddSubject = false;
        });

    }

    private filterExistingSubjects(): void {
        const studentSubjectIds: number[] = this.student.marksStorages.map(marksStorage => marksStorage.subject.id);
        this.existingSubjects = this.existingSubjects.filter(subject => !studentSubjectIds.includes(subject.id));
    }

    // because datepicker works with UTC and it makes some problems
    private dateCorrector(date: Date): Date {
        const result: Date = new Date(date);
        const timeZoneOffset: number = date.getTimezoneOffset() / 60;
        const currentHours: number = date.getHours();
        currentHours < 24 + timeZoneOffset ? result.setHours(currentHours - timeZoneOffset)
            : result.setDate(date.getDate() + 1);
        return result;
    }
}
