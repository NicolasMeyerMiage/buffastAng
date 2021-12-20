import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  log(assignmentName: string, action: string) {
    console.log("Devoir " + assignmentName + " " + action);
  }
}
