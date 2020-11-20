import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/Student";

@Injectable()
export class StudentService {
    private URL: string = "http://localhost:8080/api/students/";
    private JSON_HEADERS = new HttpHeaders().set("Content-Type", "application/json");

    constructor(private httpClient: HttpClient) {
    }

    getAllStudents(): Observable<any> {
        return this.httpClient.get(this.URL);
    }

    createStudent(student: Student): Observable<any> {
        return this.httpClient.post(this.URL, JSON.stringify(student), {headers: this.JSON_HEADERS});
    }

    updateStudent(student: Student): Observable<any> {
        return this.httpClient.put(this.URL, JSON.stringify(student), {headers: this.JSON_HEADERS});
    }

    deleteStudent(id: number): Observable<any> {
        return this.httpClient.delete(this.URL + id);
    }
}
