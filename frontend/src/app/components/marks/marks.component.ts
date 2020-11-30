import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../models/Student";
import {Mark} from "../../models/Mark";
import {MarksStorage} from "../../models/MarksStorage";
import {MatTable} from "@angular/material/table";
import {StudentService} from "../../services/student.service";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/Subject";

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
    // todo not the best practice I think
    // todo handle adding subject and ...

    saveState: string;
    isNeedToAddSubject: boolean = false;
    selectedSubject: Subject;

    constructor(private studentService: StudentService, private subjectService: SubjectService) {
    }

    ngOnInit(): void {
        if (this.student.marksStorages.length > 0) {
            this.selectedMarksStorage = this.student.marksStorages[0];
        }
        this.loadSubjects();
    }

    getBeautifulDate(date: Date | string | null): string {
        return date === null ? "" : new Date(date).toLocaleDateString('ru-RU');
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

    onAddSubjectClick(): void {
        this.isNeedToAddSubject = true;
    }

    private filterExistingSubjects(): void {
        const studentSubjectIds: number[] = this.student.marksStorages.map(marksStorage => marksStorage.subject.id);
        console.log(this.student.id + " : " + studentSubjectIds);
        this.existingSubjects = this.existingSubjects.filter(subject => !studentSubjectIds.includes(subject.id));
        console.log(this.student.id + " : " + this.existingSubjects);

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
