import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../models/Student";
import {Mark} from "../../models/Mark";
import {MarksStorage} from "../../models/MarksStorage";
import {MatTable} from "@angular/material/table";
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'marks-app',
    templateUrl: './marks.component.html'
})

export class MarksComponent implements OnInit {

    @Input() student: Student;
    @ViewChild(MatTable) table: MatTable<Mark>;

    displayedMarkColumns: string[] = ['point', 'date'];
    maxDate: Date = new Date();
    markPoints: number[] = [2, 3, 4, 5];
    markToAdd: Mark = new Mark(0, 5, new Date());
    selectedMarksStorage: MarksStorage;
    // todo not the best practice I think
    saveState: string;

    constructor(private studentService: StudentService) {
    }

    ngOnInit(): void {
        if (this.student.marksStorages.length > 0) {
            this.selectedMarksStorage = this.student.marksStorages[0];
        }
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
            data => this.saveState="success",
            error => this.saveState="error"
        );
    }

    // because datepicker works with UTC and it makes some problems
    private dateCorrector(date: Date): Date {
        const result: Date = new Date(date);
        const timeZoneOffset: number = date.getTimezoneOffset() / 60;
        const currentHours: number = date.getHours();
        currentHours < 24 + timeZoneOffset ? result.setHours(currentHours - timeZoneOffset) : result.setDate(date.getDate() + 1);
        return result;
    }
}
