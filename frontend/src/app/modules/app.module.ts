import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../components/main/app.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "../components/add-student-dialog/add-student-dialog,component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {UpdateStudentDialogComponent} from "../components/update-student-dialog/update-student-dialog.component";

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule],
    declarations: [AppComponent, AddStudentDialogComponent, UpdateStudentDialogComponent],
    bootstrap: [AppComponent],
    entryComponents: [AddStudentDialogComponent, UpdateStudentDialogComponent]
})

export class AppModule {
}