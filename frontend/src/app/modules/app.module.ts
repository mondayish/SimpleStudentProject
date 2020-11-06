import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../components/app.component";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, MatTableModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}