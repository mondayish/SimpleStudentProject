import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {StudentDialog} from "../../dialogs/student-dialog";

@Component({
    selector: "add-student-dialog",
    templateUrl: "./add-student-dialog.component.html"
})

export class AddStudentDialogComponent extends StudentDialog {

    constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>) {
        super();
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddClick(): void {
        this.dialogRef.close(this.student);
    }
}
