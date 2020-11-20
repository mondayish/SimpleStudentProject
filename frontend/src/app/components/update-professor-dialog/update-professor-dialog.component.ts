import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Professor} from "../../models/Professor";
import {ProfessorDialog} from "../../dialogs/professor-dialog";

@Component({
    selector: 'update-professor-dialog',
    templateUrl: './update-professor-dialog.component.html'
})
export class UpdateProfessorDialogComponent extends ProfessorDialog {

    constructor(public dialogRef: MatDialogRef<UpdateProfessorDialogComponent>, @Inject(MAT_DIALOG_DATA) professor: Professor) {
        super();
        this.professor = professor;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onEditClick(): void {
        this.dialogRef.close(this.professor);
    }
}
