import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";
import { UserModel } from "../models/user.model";

@Component({
  selector: 'app-assignment-login',
  templateUrl: './assignment-login.component.html',
  styleUrls: ['./assignment-login.component.scss']
})
export class AssignmentLoginComponent implements OnInit {

  error?: string;
  loginForm!: FormGroup;
  admin: boolean = false;
  user!: UserModel;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    this.loginForm = this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): FormGroup {
    return new FormGroup({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  submitForm() {
    let logs: UserModel = new UserModel();
    logs.login = this.loginForm.value['login'];
    logs.password = this.loginForm.value['password'];
    this.authService.isExist(logs)
      .subscribe(result => {
        this.user = result
        if(this.user != null) {
          if(this.user.role === 'admin')
            this.admin = true;
          this.authService.logIn(this.admin);
          this.error = undefined;
          this.router.navigate(['/home']);
        } else {
          this.error = 'Mauvais identifiants';
        }
      });
  }
}
