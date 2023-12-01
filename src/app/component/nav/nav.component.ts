import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  isAdmin:Boolean=false;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin)=>{
      this.isAdmin=isAdmin;
    });
  }
  logout():void{
    this.authService.logout();
  }
}
