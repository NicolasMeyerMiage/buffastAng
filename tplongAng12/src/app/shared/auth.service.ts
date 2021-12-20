import { Injectable, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { UserModel } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {catchError, map} from "rxjs/operators";
import { Utils } from "./utils";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  loggedIn: boolean = false;
  admin: boolean = false;
  users?: UserModel[];
  url: string = 'http://localhost:8010/api/login';

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private router: Router,
              private utils: Utils) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  logIn(admin: boolean) {
    this.loggedIn = true;
    this.admin = admin;
  }

  logOut() {
    this.loggedIn = false;
    this.admin = false;
    this.router.navigate(['/home']);
  }

  isLogged() {
    const isUserLogged = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    );
    return isUserLogged;
  }

  isExist(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.url, user, this.utils.HttpOptions)
      .pipe(
        map(userModel => {
          return userModel;
        }),
        catchError(this.utils.handleError<UserModel>(`isExist(user=${user}`))
      );
  }
}
