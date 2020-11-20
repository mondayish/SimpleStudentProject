import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Professor} from "../../models/Professor";
import {ProfessorService} from "../../services/professor.service";
import {AddProfessorDialogComponent} from "../add-professor-dialog/add-professor-dialog.component";
import {UpdateProfessorDialogComponent} from "../update-professor-dialog/update-professor-dialog.component";

@Component({
    selector: 'professor-app',
    templateUrl: './professor.component.html'
})
export class ProfessorComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    professors: Professor[];
    dataSource: MatTableDataSource<Professor>;
    displayedColumns: string[] = ["id", "name", "age", "edit", "delete"];

    constructor(private professorService: ProfessorService, public addDialog: MatDialog, public updateDialog: MatDialog) {
        this.professors = [];
    }

    ngOnInit(): void {
        this.loadProfessors();
    }

    addProfessor(): void {
        const dialogRef = this.addDialog.open(AddProfessorDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.professorService.createProfessor(result).subscribe((newProfessor: Professor) => {
                    this.professors.push(newProfessor);
                    this.refreshDataSource();
                });
            }
        });
    }

    updateProfessor(professor: Professor): void {
        const dialogRef = this.updateDialog.open(UpdateProfessorDialogComponent, {
            width: '300px',
            data: new Professor(professor.id, professor.name, professor.age, [])
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.professorService.updateProfessor(result).subscribe((updatedProfessor: Professor) => {
                    this.professors = this.professors.filter((item) => item !== professor);
                    this.professors.push(updatedProfessor);
                    this.refreshDataSource();
                });
            }
        });
    }

    deleteProfessor(professor: Professor): void {
        this.professorService.deleteProfessor(professor.id).subscribe(data => {
            this.professors = this.professors.filter((item) => item !== professor);
            this.refreshDataSource();
        });
    }

    private loadProfessors(): void {
        this.professorService.getAllProfessors().subscribe((data: Professor[]) => {
            this.professors = data;
            this.initializeDataSource();
        });
    }

    private refreshDataSource(): void{
        this.dataSource.data = this.professors;
    }

    private initializeDataSource(): void {
        this.dataSource = new MatTableDataSource<Professor>(this.professors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => item[property];
    }
}
