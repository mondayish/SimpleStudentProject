import {Component, TemplateRef, ViewChild} from "@angular/core";
import {StudentService} from "../services/student.service";
import {Student} from "../models/student";

@Component({
    selector: "student-app",
    templateUrl: './app.component.html',
    providers: [StudentService]
})

export class AppComponent {
    @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

    editedStudent: Student;
    students: Array<Student>;
    isNewRecord: boolean;
    statusMessage: string;

    constructor(private studentService: StudentService) {
        this.students = new Array<Student>();
    }

    ngOnInit(): void {
        this.loadStudents();
    }

    private loadStudents(): void {
        this.studentService.getAllStudents().subscribe((data: Student[]) => {
            this.students = data;
        });
    }

    addStudent(): void {
        this.editedStudent = new Student(0, "", "", 0);
        this.students.push(this.editedStudent);
        this.isNewRecord = true;
    }

    editStudent(student: Student): void {
        this.editedStudent = new Student(student.id, student.firstName, student.lastName, student.age);
    }

    loadTemplate(student: Student): TemplateRef<any> {
        if (this.editedStudent && this.editedStudent.id === student.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveStudent(): void {
        if (this.isNewRecord) {
            this.studentService.createStudent(this.editedStudent).subscribe(data => {
                this.statusMessage = 'Student was successfully added';
                this.loadStudents();
            });
            this.isNewRecord = false;
            this.editedStudent = null;
        } else {
            this.studentService.updateStudent(this.editedStudent).subscribe(data => {
                this.statusMessage = 'Student was successfully updated';
                this.loadStudents();
            });
            this.editedStudent = null;
        }
    }

    cancel(): void {
        if (this.isNewRecord) {
            this.students.pop();
            this.isNewRecord = false;
        }
        this.editedStudent = null;
    }

    deleteStudent(student: Student): void {
        this.studentService.deleteStudent(student.id).subscribe(data => {
            this.statusMessage = 'Student was successfully deleted';
            this.loadStudents();
        });
    }
}