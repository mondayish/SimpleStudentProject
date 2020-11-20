import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProfessorDialog} from "../../dialogs/professor-dialog";

@Component({
    selector: 'add-professor-dialog',
    templateUrl: './add-professor-dialog.component.html'
})

export class AddProfessorDialogComponent extends ProfessorDialog{

    constructor(public dialogRef: MatDialogRef<AddProfessorDialogComponent>) {
        super();
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddClick(): void {
        this.dialogRef.close(this.professor);
    }
}
