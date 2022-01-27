import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Utils} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  url: string = 'http://localhost:8010/api/teachers';

  constructor(private httpClient: HttpClient,
              private utils: Utils) {
  }

  getTeacherByUe(ue: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/ue/' + ue)
      .pipe(
        map(teachers => {
          return teachers;
        }),
        catchError(this.utils.handleError<any>(`getTeacherByUe()`))
      );
  }
}
