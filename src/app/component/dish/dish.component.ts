import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Dish } from 'src/app/model/dish';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { DishService } from 'src/app/service/dish.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
})
export class DishComponent implements OnInit {
  error: string = '';
  dishes: Dish[] = [];
  userCart: Cart[] = [];
  dishTitle: string = '';

  constructor(
    private authService: AuthService,
    private dishService: DishService,
    private cartService: CartService,
    private storageservice: StorageService
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

      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
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
      count: 1,
      price: 0,
      id: 0,
    };
    console.log(Cart);

    this.cartService.addCart(Cart).subscribe({
      next: (response: AppResponse) => {
        this.userCart.push(response.data);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
