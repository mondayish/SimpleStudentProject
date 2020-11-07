import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../components/app.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {AddStudentDialogComponent} from "../components/add-student-dialog,component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
    declarations: [AppComponent, AddStudentDialogComponent],
    bootstrap: [AppComponent],
    entryComponents: [AddStudentDialogComponent]
})

export class AppModule {
}