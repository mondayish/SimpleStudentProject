import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

export class MarksComponent implements OnInit {

    @Input() student: Student;
    @ViewChild(MatTable) table: MatTable<Mark>;

    existingSubjects: Subject[];
    displayedMarkColumns: string[] = ['point', 'date'];
    maxDate: Date = new Date();
    markPoints: number[] = [2, 3, 4, 5];
    markToAdd: Mark = new Mark(0, 5, new Date());
    selectedMarksStorage: MarksStorage;

    // todo write more comments or documentation...
    // todo fix save state?
    // todo refactoring
    // todo auto loading new subjects after adding new

    saveState: string;
    isNeedToAddSubject: boolean = false;
    selectedSubject: Subject;

    subjectForm: FormGroup;
    subjectToAdd: Subject = new Subject(0, '', '', null, null);

    constructor(private studentService: StudentService, private subjectService: SubjectService) {
    }

    ngOnInit(): void {
        if (this.student.marksStorages.length > 0) {
            this.selectedMarksStorage = this.student.marksStorages[0];
        }
        this.loadSubjects();

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
            data => this.saveState = "success",
            error => this.saveState = "error"
        );
    }

    toggleIsNeedToAddSubject(){
        this.isNeedToAddSubject = !this.isNeedToAddSubject;
    }

    onAddExistingClick(): void {
        this.student.marksStorages.push(new MarksStorage(0, [], null, this.selectedSubject));
        this.filterExistingSubjects();
        this.isNeedToAddSubject = false;
    }

    onAddNewClick(): void {
        this.student.marksStorages.push(new MarksStorage(0, [], null, this.subjectToAdd));
        this.isNeedToAddSubject = false;
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

    private loadSubjects(): void {
        this.subjectService.getAllSubject().subscribe((data: Subject[]) => {
            this.existingSubjects = data;
            this.filterExistingSubjects();
        });
    }
}
