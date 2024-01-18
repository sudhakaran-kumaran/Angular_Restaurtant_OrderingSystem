import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  username: String = '';
  password: String = '';
  error: String = '';
  check: boolean = false;

  constructor(private authService: AuthService,
    private router:Router) {
    this.reload();

  }

  login(_loginForm: Form): void {

    let login: Login = {
      username: this.username,
      password: this.password,
    };
    this.authService.login(login).subscribe({
      next: (response: AppResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
      },
      error: (err) => {
        console.log(err);

        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
  reload() {
    if (!this.check) {
      // Use Angular Router to navigate to the same route
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.check = true;
      });
    }
  }
}
