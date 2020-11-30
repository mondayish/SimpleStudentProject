import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SubjectService {
    private URL: string = "http://localhost:8080/api/subjects/";

    constructor(private httpClient: HttpClient) {
    }

    getAllSubject(): Observable<any> {
        return this.httpClient.get(this.URL);
    }
}
