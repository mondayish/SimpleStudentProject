import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../models/Student";

@Component({
    selector: "add-student-dialog",
    templateUrl: "./add-student-dialog.component.html"
})

export class AddStudentDialogComponent {

    student: Student;

    constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>) {
        this.student = new Student(0, "", "", 0);
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddClick(): void {
        this.dialogRef.close(this.student);
    }
}
