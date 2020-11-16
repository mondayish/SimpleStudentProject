import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Professor} from "../../models/Professor";

@Component({
    selector: 'update-professor-dialog',
    templateUrl: './update-professor-dialog.component.html'
})
export class UpdateProfessorDialogComponent {

    professor: Professor

    constructor(public dialogRef: MatDialogRef<UpdateProfessorDialogComponent>, @Inject(MAT_DIALOG_DATA) professor: Professor) {
        this.professor = professor;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onEditClick(): void {
        this.dialogRef.close(this.professor);
    }
}
