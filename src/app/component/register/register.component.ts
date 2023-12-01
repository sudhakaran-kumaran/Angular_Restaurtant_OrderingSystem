import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registers:Register[]=[];
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
 
  constructor(private authService:AuthService,private router:Router){}
 
  person:String='';
  nameRef:String='';
  password:String='';
  role:String='';
 
  onSubmit(form:any){
    const newregister:Register={
      username: this.nameRef,
      password:this.password,
      name:this.person,
      role:this.role
 
 
    };
    this.authService.register(newregister).subscribe({
      next:(response:AppResponse)=>{
        this.registers.push(response.data);
        this.router.navigate(['/login']);
      }
    });
  }
  // options: AnimationOptions = {
  //   path: '/assets/auth.json',
  // };
  
}
