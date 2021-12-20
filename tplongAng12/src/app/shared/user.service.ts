import { Injectable } from '@angular/core';
import { UserModel } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AssignmentModel} from "../models/assignment.model";
import {Utils} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:8010/api/users';

  constructor(private httpClient: HttpClient,
              private utils: Utils) { }

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.url, this.utils.HttpOptions)
      .pipe(
        map(arrayUserModel => {
          return arrayUserModel;
        }),
        catchError(this.utils.handleError<UserModel[]>(`getUsers()`))
      );
  }

  /* Unused methods but can be.
  getUserById(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.url + "/" + id);
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.url, user);
  }

  deleteUser(user: UserModel): Observable<any> {
    return this.httpClient.delete(this.url + "/" + user._id);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(this.url, user);
  }*/
}
