import {Component, OnInit, ViewChild} from "@angular/core";
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/Student";
import {MatDialog} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "../add-student-dialog/add-student-dialog,component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {UpdateStudentDialogComponent} from "../update-student-dialog/update-student-dialog.component";
import {PageableParams} from "../../models/PageableParams";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/Subject";

@Component({
    selector: "student-app",
    templateUrl: './student.component.html',
    providers: [StudentService],
    styleUrls: ['./student.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})

export class StudentComponent implements OnInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    totalStudents: number = 0;
    expandedStudent: Student | null;
    allSubjects: Subject[];
    students: Student[];
    dataSource: MatTableDataSource<Student>
    displayedStudentColumns: string[] = ["id", "firstName", "lastName", "age", "edit", "delete"];

    constructor(private studentService: StudentService,
                private subjectService: SubjectService,
                private addDialog: MatDialog,
                private updateDialog: MatDialog) {
        this.students = [];
    }

    ngOnInit(): void {
        this.loadStudents({page: 0, size: 5});
        this.loadSubjects();
    }

    addStudent(): void {
        const dialogRef = this.addDialog.open(AddStudentDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.studentService.createStudent(result).subscribe((newStudent: Student) => {
                    this.refreshCurrentPage();
                });
            }
        });
    }

    updateStudent(student: Student): void {
        const dialogRef = this.updateDialog.open(UpdateStudentDialogComponent, {
            width: '300px',
            data: new Student(student.id, student.firstName, student.lastName, student.age, [])
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.studentService.updateStudent(result).subscribe((updatedStudent: Student) => {
                    this.refreshCurrentPage();
                });
            }
        });
    }

    deleteStudent(student: Student): void {
        this.studentService.deleteStudent(student.id).subscribe(data => {
            this.refreshCurrentPage();
        });
    }

    nextPage(event: PageEvent | { pageSize: number, pageIndex: number }) {
        this.loadStudents({page: event.pageIndex, size: event.pageSize});
    }

    onRowClick(student: Student) {
        this.expandedStudent = this.expandedStudent === student ? null : student;
    }

    // we need to refer to another array to emit changes
    onAddNewSubject(newSubject: Subject) {
        this.allSubjects = this.allSubjects.concat(newSubject);
    }

    private loadStudents(params: PageableParams): void {
        this.studentService.getAllStudents(params).subscribe(data => {
            this.students = data['content'];
            this.totalStudents = data['totalElements'];
            this.initializeDataSource();
        });
    }

    private loadSubjects(): void {
        this.subjectService.getAllSubject().subscribe((data: Subject[]) => this.allSubjects = data);
    }

    // refresh the current page of table for accepting CRUD operations
    private refreshCurrentPage() {
        this.nextPage({pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize});
    }

    private initializeDataSource(): void {
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => item[property];
    }
}
