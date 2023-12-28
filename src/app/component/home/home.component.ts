import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { Route, Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { AuthService } from 'src/app/service/auth.service';
import { DishService } from 'src/app/service/dish.service';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  error: string = '';
  dishes: Dish[] = [];
  userCart: Cart[] = [];
  dishTitle: string = '';
  count=1;

  constructor(
    private authService: AuthService,
    private dishService: DishService,
    private cartService: CartService,
    private storageservice: StorageService,

    ) {}
  logout(): void {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.dishService.getAllDish().subscribe({
      next: (response: any) => {
        this.dishes = response.data;
        console.log('dishessss', this.dishes);
      },

      
    });
    this.cartService
      .getUserCart(this.storageservice.getLoggedInUser().id)
      .subscribe({
        next: (response: any) => {
          this.userCart = response.data;
        },
      });
  }
  getCartItemCount(id: number): number {
    let count: number =
      this.userCart.find((cartDish) => cartDish.dish.id === id)?.count ?? 0;
    return count;
  }
  addtoCart(dish: Dish) {
    let user: AppUser = this.storageservice.getLoggedInUser();
    const Cart: Cart = {
      userId: user.id,
      dishId: dish.id,
      dish: dish,
      dishTitle: '',
      count: this.count++,
      price: 0,
      id: 0,
    };
    console.log(Cart.count);
    this.cartService.addCart(Cart).subscribe({
      next: (response: AppResponse) => {
        this.userCart.push(response.data);
      }
    });
  }
  
}

