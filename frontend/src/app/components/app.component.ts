import {Component, TemplateRef, ViewChild} from "@angular/core";
import {StudentService} from "../services/student.service";
import {Student} from "../models/student";
import {MatDialog} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "./add-student-dialog,component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: "student-app",
    templateUrl: './app.component.html',
    providers: [StudentService]
})

export class AppComponent {
    // @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
    // @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

    // editedStudent: Student;
    students: Student[];
    dataSource: MatTableDataSource<Student>;
    displayedColumns: string[] = ["id", "firstName", "lastName", "age", "edit", "delete"];
    // isNewRecord: boolean;
    // statusMessage: string;

    constructor(private studentService: StudentService, public addDialog: MatDialog) {
        this.students = [];
    }

    openAddDialog(): void {
        const dialogRef = this.addDialog.open(AddStudentDialogComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.studentService.createStudent(result).subscribe((newStudent: Student) => {
                    this.students.push(newStudent);
                    this.dataSource = new MatTableDataSource<Student>(this.students);
                });
            }
        })
    }

    ngOnInit(): void {
        this.loadStudents();
    }

    private loadStudents(): void {
        this.studentService.getAllStudents().subscribe((data: Student[]) => {
            this.students = data;
            this.initializeDataSource();
        });
    }

    private initializeDataSource() : void{
        this.dataSource = new MatTableDataSource<Student>(this.students);
    }

    deleteStudent(student: Student): void {
        this.studentService.deleteStudent(student.id).subscribe(data => {
            this.students.forEach((item, index) => {
                if (item === student) this.students.splice(index, 1);
                this.initializeDataSource();
            });
        });
    }

    // addStudent(): void {
    //     this.editedStudent = new Student(0, "", "", 0);
    //     this.students.push(this.editedStudent);
    //     this.isNewRecord = true;
    // }
    //
    // editStudent(student: Student): void {
    //     this.editedStudent = new Student(student.id, student.firstName, student.lastName, student.age);
    // }
    //
    // loadTemplate(student: Student): TemplateRef<any> {
    //     if (this.editedStudent && this.editedStudent.id === student.id) {
    //         return this.editTemplate;
    //     } else {
    //         return this.readOnlyTemplate;
    //     }
    // }
    //
    // saveStudent(): void {
    //     if (this.isNewRecord) {
    //         this.studentService.createStudent(this.editedStudent).subscribe(data => {
    //             this.statusMessage = 'Student was successfully added';
    //             this.loadStudents();
    //         });
    //         this.isNewRecord = false;
    //         this.editedStudent = null;
    //     } else {
    //         this.studentService.updateStudent(this.editedStudent).subscribe(data => {
    //             this.statusMessage = 'Student was successfully updated';
    //             this.loadStudents();
    //         });
    //         this.editedStudent = null;
    //     }
    // }
    //
    // cancel(): void {
    //     if (this.isNewRecord) {
    //         this.students.pop();
    //         this.isNewRecord = false;
    //     }
    //     this.editedStudent = null;
    // }
    //
    // deleteStudent(student: Student): void {
    //     this.studentService.deleteStudent(student.id).subscribe(data => {
    //         this.statusMessage = 'Student was successfully deleted';
    //         this.loadStudents();
    //     });
    // }
}