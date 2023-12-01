import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private  authService: AuthService,
    public loaderService: LoaderService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  cart():void{
    this.router.navigate(['/cart']);
  }
  orders():void{
    this.router.navigate(['/orders']);
  }
}
