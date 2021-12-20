import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Application Component';

  constructor(private authService: AuthService,
              private router: Router) {}

  isLogin() {
    return this.authService.loggedIn;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogOut() {
    this.authService.loggedIn = false;
    this.router.navigate(['/home'])
  }
}
