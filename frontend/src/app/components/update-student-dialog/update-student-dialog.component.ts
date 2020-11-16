import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../models/Student";

@Component({
    selector: "update-student-dialog",
    templateUrl: "./update-student-dialog.component.html"
})

export class UpdateStudentDialogComponent{

    student: Student;

    constructor(public dialogRef: MatDialogRef<UpdateStudentDialogComponent>, @Inject(MAT_DIALOG_DATA) student: Student) {
        this.student = student;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onEditClick(): void {
        this.dialogRef.close(this.student);
    }
}
