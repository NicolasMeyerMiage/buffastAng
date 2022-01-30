import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Utils} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url: string = 'http://localhost:8010/api/students';

  constructor(private httpClient: HttpClient,
              private utils: Utils) {
  }

  getStudentsByClasse(nomClasse: string): Observable<any> {
    let httpParams: HttpParams = new HttpParams().set('classe', nomClasse);
    return this.httpClient.get<any>(this.url + '/id/params', {params: httpParams})
      .pipe(
        map(classes => {
          return classes;
        }),
        catchError(this.utils.handleError<any>(`getClasses()`))
      );
  }
}
