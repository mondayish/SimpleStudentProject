import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Professor} from "../../models/Professor";

@Component({
    selector: 'add-professor-dialog',
    templateUrl: './add-professor-dialog.component.html'
})
export class AddProfessorDialogComponent {

    professor: Professor;

    constructor(public dialogRef: MatDialogRef<AddProfessorDialogComponent>) {
        this.professor = new Professor(0, "", 0, []);
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onAddClick(): void {
        this.dialogRef.close(this.professor);
    }
}
