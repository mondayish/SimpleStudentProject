import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../models/Student";
import {StudentDialog} from "../../dialogs/student-dialog";

@Component({
    selector: "update-student-dialog",
    templateUrl: "./update-student-dialog.component.html"
})

export class UpdateStudentDialogComponent extends StudentDialog {

    constructor(public dialogRef: MatDialogRef<UpdateStudentDialogComponent>, @Inject(MAT_DIALOG_DATA) student: Student) {
        super();
        this.student = student;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onEditClick(): void {
        this.dialogRef.close(this.student);
    }
}
