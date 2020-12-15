import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Professor} from "../../models/Professor";
import {ProfessorService} from "../../services/professor.service";
import {AddProfessorDialogComponent} from "../add-professor-dialog/add-professor-dialog.component";
import {UpdateProfessorDialogComponent} from "../update-professor-dialog/update-professor-dialog.component";
import {PageableParams} from "../../models/PageableParams";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/Subject";

@Component({
    selector: 'professor-app',
    templateUrl: './professor.component.html'
})
export class ProfessorComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    totalProfessors: number = 0;
    professors: Professor[];
    dataSource: MatTableDataSource<Professor>;
    displayedColumns: string[] = ["id", "name", "age", "subjects", "edit", "delete"];

    constructor(private professorService: ProfessorService,
                private addDialog: MatDialog,
                private updateDialog: MatDialog) {
        this.professors = [];
    }

    ngOnInit(): void {
        this.loadProfessors({page: 0, size: 5});
    }

    addProfessor(): void {
        const dialogRef = this.addDialog.open(AddProfessorDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.professorService.createProfessor(result).subscribe((newProfessor: Professor) => {
                    this.refreshCurrentPage();
                });
            }
        });
    }

    updateProfessor(professor: Professor): void {
        const dialogRef = this.updateDialog.open(UpdateProfessorDialogComponent, {
            width: '300px',
            data: new Professor(professor.id, professor.name, professor.age, professor.subjects)
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.professorService.updateProfessor(result).subscribe((updatedProfessor: Professor) => {
                    this.refreshCurrentPage();
                });
            }
        });
    }

    deleteProfessor(professor: Professor): void {
        this.professorService.deleteProfessor(professor.id).subscribe(data => {
            this.refreshCurrentPage();
        });
    }

    nextPage(event: PageEvent | { pageSize: number, pageIndex: number }) {
        this.loadProfessors({page: event.pageIndex, size: event.pageSize});
    }

    getSubjectsRow(subjects: Subject[]): string {
        let result = "";
        subjects?.forEach(subject => result+=subject.name+", ");
        return result.length === 0 ? result : result.substr(0, result.length-2);
    }

    private loadProfessors(params: PageableParams): void {
        this.professorService.getAllProfessors(params).subscribe(data => {
            this.professors = data['content'];
            this.totalProfessors = data['totalElements'];
            this.initializeDataSource();
        });
    }

    // refresh the current page of table for accepting CRUD operations
    private refreshCurrentPage() {
        this.nextPage({pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize});
    }

    private initializeDataSource(): void {
        this.dataSource = new MatTableDataSource<Professor>(this.professors);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => item[property];
    }
}
