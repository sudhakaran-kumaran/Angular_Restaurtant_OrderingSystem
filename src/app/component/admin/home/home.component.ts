import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {
  error:string='';
  users:AppUser[]=[];
  
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next:(response:any)=>{
        this.users=response.data;
      },
      error:(err)=>{
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message
      }

    })
  }

}
