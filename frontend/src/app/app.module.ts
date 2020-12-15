import {Injector, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {StudentComponent} from "./components/student/student.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "./components/add-student-dialog/add-student-dialog,component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {UpdateStudentDialogComponent} from "./components/update-student-dialog/update-student-dialog.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AppComponent} from "./components/main/app.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {Routes, RouterModule} from "@angular/router";
import {ProfessorComponent} from './components/professor/professor.component';
import {AddProfessorDialogComponent} from './components/add-professor-dialog/add-professor-dialog.component';
import {UpdateProfessorDialogComponent} from './components/update-professor-dialog/update-professor-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MarksComponent} from './components/marks/marks.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {ServiceLocator} from "./services/ServiceLocator";

const appRoutes: Routes = [
    {path: 'students', component: StudentComponent},
    {path: 'professors', component: ProfessorComponent},
    {path: '**', component: StudentComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes), BrowserModule, MatMomentDateModule, BrowserAnimationsModule, FormsModule, HttpClientModule, MatTableModule, MatSidenavModule, MatNativeDateModule,
        MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatIconModule, MatListModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule],
    declarations: [StudentComponent, AddStudentDialogComponent, UpdateStudentDialogComponent, AppComponent, ProfessorComponent, AddProfessorDialogComponent, UpdateProfessorDialogComponent, MarksComponent],
    bootstrap: [AppComponent],
    entryComponents: [AddStudentDialogComponent, UpdateStudentDialogComponent],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
    ]
})

export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = injector;
    }
}
