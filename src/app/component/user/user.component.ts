import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  error:string='';
  users:User[]=[];
  
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    console.log(this.users);  
    
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

  

