import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { Dish } from 'src/app/model/dish';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { DishService } from 'src/app/service/dish.service';

@Component({
  selector: 'app-admindish',
  templateUrl: './admindish.component.html',
})
export class AdmindishComponent implements OnInit {
  error: string = '';
  dishes: Dish[] = [];
  categories: Category[] = [];
  title: string = 'dskfwknf';
  description: string = '';
  categoryId: number = 0;
  price: number = 0;
  photo: any;
  id: number = 0;
  image: [] = [];
  editState: number = 0;
  buttontxt: string = 'Add';
  file = '';
  constructor(
    private authService: AuthService,
    private dishService: DishService,
    private categoryService: CategoryService
  ) {}
  logout(): void {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.dishService.getAllDish().subscribe({
      next: (response: any) => {
        this.dishes = response.data;
      },
    });
    this.categoryService.getAllCategory().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
    });
  }
  onSubmit(form: NgForm): void {
    console.log(form.value.title);

    if (form.valid) {
      //    {id: 0, title: "", description: "", categoryId: 0, price: 0}

      console.log(form.value.categoryId);

      const formData = new FormData();
      formData.append('photo', this.file);
      formData.append('categoryId', form.value.categoryId);
      formData.append('title', form.value.title);
      formData.append('description', form.value.description);
      formData.append('price', form.value.price);
      console.log(formData);

      if (this.editState === 0) {
        const dish: Dish = {
          id: this.id,
          title: this.title,
          description: this.description,
          categoryId: this.categoryId,
          price: this.price,
          photo: this.photo,
        };
        //  console.log(dish,"kdnsnsinfcsnvefvskoncsn");

        this.dishService.addDish(formData).subscribe({
          next: (response: AppResponse) => {
            this.dishes.push(response.data);
            this.ngOnInit();
          },
        });
      } else {
        const formData = new FormData();
        // formData.append('id',this.id.toString)
        formData.append('photo', this.file);
        formData.append('categoryId', form.value.categoryId);
        formData.append('title', form.value.title);
        formData.append('description', form.value.description);
        formData.append('price', form.value.price);
        this.dishService.updateDish(formData).subscribe({
          next: (response: any) => {
            this.dishes.push(response.data);
            this.editState = 0;
            this.ngOnInit();
          },
        });
      }
      this.buttontxt = 'Add';
    }
  }
  edit(id: number): void {
    let dish = this.dishes.find((o) => o.id === id);
    this.title = dish!.title;
    this.description = dish!.description;
    this.categoryId = dish!.categoryId;
    this.price = dish!.price;
    this.buttontxt = 'Edit';
    this.editState = dish!.id;
  }
  delete(id: number): void {
    console.log(id);

    this.dishService.deleteDish(id).subscribe({
      next: (response: AppResponse) => {
        this.dishes = this.dishes.filter((dish) => dish.id !== id);
        this.ngOnInit();
      },
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      console.log('Selected file:', this.file);
    }
  }
}
