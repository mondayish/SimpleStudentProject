import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../models/Subject";

@Injectable({providedIn: 'root'})
export class SubjectService {
    private URL: string = "http://localhost:8080/api/subjects/";
    private JSON_HEADERS = new HttpHeaders().set("Content-Type", "application/json");

    constructor(private httpClient: HttpClient) {
    }

    getAllSubject(): Observable<any> {
        return this.httpClient.get(this.URL);
    }

    createSubject(subject: Subject): Observable<any> {
        return this.httpClient.post(this.URL, JSON.stringify(subject), {headers: this.JSON_HEADERS});
    }
}
