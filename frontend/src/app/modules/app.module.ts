import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../components/app.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, MatTableModule, MatButtonModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}