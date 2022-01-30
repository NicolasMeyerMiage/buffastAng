import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Utils} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  url: string = 'http://localhost:8010/api/classes';

  constructor(private httpClient: HttpClient,
              private utils: Utils) {
  }

  getClasses(): Observable<any> {
    return this.httpClient.get<any>(this.url)
      .pipe(
        map(classes => {
          return classes;
        }),
        catchError(this.utils.handleError<any>(`getClasses()`))
      );
  }
}
