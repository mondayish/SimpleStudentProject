import {Component, OnInit, ViewChild} from "@angular/core";
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/Student";
import {MatDialog} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "../add-student-dialog/add-student-dialog,component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UpdateStudentDialogComponent} from "../update-student-dialog/update-student-dialog.component";

@Component({
    selector: "student-app",
    templateUrl: './student.component.html',
    providers: [StudentService]
})

export class StudentComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    students: Student[];
    dataSource: MatTableDataSource<Student>;
    displayedColumns: string[] = ["id", "firstName", "lastName", "age", "edit", "delete"];

    constructor(private studentService: StudentService, public addDialog: MatDialog, public updateDialog: MatDialog) {
        this.students = [];
    }

    // todo pagination on backend
    // todo maybe some styles
    // todo validation

    ngOnInit(): void {
        this.loadStudents();
    }

    addStudent(): void {
        const dialogRef = this.addDialog.open(AddStudentDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.studentService.createStudent(result).subscribe((newStudent: Student) => {
                    this.students.push(newStudent);
                    this.refreshDataSource();
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
                    this.students = this.students.filter((item) => item !== student);
                    this.students.push(updatedStudent);
                    this.refreshDataSource();
                });
            }
        });
    }

    deleteStudent(student: Student): void {
        this.studentService.deleteStudent(student.id).subscribe(data => {
            this.students = this.students.filter((item) => item !== student);
            this.refreshDataSource();
        });
    }

    private loadStudents(): void {
        this.studentService.getAllStudents().subscribe((data: Student[]) => {
            this.students = data;
            this.initializeDataSource();
        });
    }

    // the best way that I found
    private refreshDataSource(): void{
        this.dataSource.data = this.students;
    }

    private initializeDataSource(): void {
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => item[property];
    }
}
