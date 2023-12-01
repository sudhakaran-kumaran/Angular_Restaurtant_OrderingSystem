import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  error: string = '';
  categories: Category[] = [];
  title:string="";
  editState:number=0;
  buttontxt:string='Add';
  

  constructor(private categoryService: CategoryService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      // error: () => {
      //   let message: string = err?.error?.error?.message;
      //   this.error = message.includes(',') ? message.split(',')[0] : message;
      // },
    });
  }
  addCategory():void{
    if(this.editState===0){
      let category:Category={
        title: this.title,
    
      };
      this.categoryService.addCategory(category).subscribe({
        next:(response:AppResponse)=>{
          this.categories=response.data;
        }
      })
    }else{
      let category:Category={
        id:this.editState,
        title:this.title
      };
      this.categoryService.updateCategory(category).subscribe({
        next:(response:any)=>{
          this.categories=response.data;
          this.editState=0;
        }
      });

    }
    this.buttontxt='Add';
    this.title='';
    
  }
    updateCategory(id:number) : void{
      this.title=this.categories.find((category)=>category.id === id)?.title!;
      this.buttontxt='Edit';
      this.editState=id;
    }
  deleteCategory(id : number) :void{
    console.log("click");
    
    
        this.categoryService.deleteCategory(id).subscribe({
        next:(response:any)=>{
          this.categories = this.categories.filter(
            (category) => category.id !== id
          );
          this.ngOnInit();
        }
        
      })
    }
  
 }
     