import { Injectable } from '@angular/core';
import { AssignmentModel } from "../models/assignment.model";
import { Observable, of } from "rxjs";
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Utils } from "./utils";
import assignmentsData from "./data.json";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  url: string = 'http://localhost:8010/api/assignments';

  constructor(private loginSerivce: LoginService,
              private httpClient: HttpClient,
              private utils: Utils) { }

  getAssignments(page: number, limit: number, done: boolean): Observable<any> {
    return this.httpClient.get<any>(this.url, {params : this.utils.getHttpParams(page, limit, done)})
      .pipe(
        map(assignments => {
          return assignments;
        }),
        catchError(this.utils.handleError<any>(`getAssignments()`))
      );
  }

  getAssignmentById(id: number): Observable<AssignmentModel> {
    return this.httpClient.get<AssignmentModel>(this.url + "/" + id, this.utils.HttpOptions)
      .pipe(
        map(assignment => {
          return assignment;
        }),
        catchError(this.utils.handleError<AssignmentModel>(`getAssignment(id=${id})`))
      );
  }

  addAssignment(assignment: AssignmentModel): Observable<AssignmentModel> {
    return this.httpClient.post<AssignmentModel>(this.url, assignment, this.utils.HttpOptions)
      .pipe(
        map(assignment => {
          return assignment;
        }),
        catchError(this.utils.handleError<AssignmentModel>(`addAssignmet(assignment=${assignment})`))
      );
  }

  deleteAssignment(assignment: AssignmentModel): Observable<any> {
    return this.httpClient.delete(this.url + "/" + assignment._id, this.utils.HttpOptions)
      .pipe(
        map(assignment => {
          return assignment;
        }),
        catchError(this.utils.handleError<AssignmentModel>(`deleteAssignment(id=${assignment._id})`))
      );
  }

  updateAssignment(assignment: AssignmentModel): Observable<AssignmentModel> {
    return this.httpClient.put<AssignmentModel>(this.url, assignment)
      .pipe(
        map(assignment => {
          return assignment;
        }),
        catchError(this.utils.handleError<AssignmentModel>(`updateAssignment(id=${assignment})`))
      );
  }

  peuplerBd() {
    let assignmentData = assignmentsData;
    assignmentData.forEach(result => {
      let addAssign = new AssignmentModel();
      addAssign.id = result.id;
      addAssign.nom = result.nom;
      addAssign.rendu = result.rendu;
      addAssign.dateDeRendu = new Date(result.dateDeRendu);
      this.addAssignment(addAssign);
    });
  }
}
