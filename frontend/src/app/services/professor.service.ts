import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Professor} from "../models/Professor";

@Injectable({providedIn: 'root'})
export class ProfessorService {
    private URL: string = "http://localhost:8080/api/professors/";
    private JSON_HEADERS = new HttpHeaders().set("Content-Type", "application/json");

    constructor(private httpClient: HttpClient) {
    }

    getAllProfessors(): Observable<any> {
        return this.httpClient.get(this.URL);
    }

    createProfessor(professor: Professor): Observable<any> {
        return this.httpClient.post(this.URL, JSON.stringify(professor), {headers: this.JSON_HEADERS});
    }

    updateProfessor(professor: Professor): Observable<any> {
        return this.httpClient.put(this.URL, JSON.stringify(professor), {headers: this.JSON_HEADERS});
    }

    deleteProfessor(id: number): Observable<any> {
        return this.httpClient.delete(this.URL + id);
    }
}
