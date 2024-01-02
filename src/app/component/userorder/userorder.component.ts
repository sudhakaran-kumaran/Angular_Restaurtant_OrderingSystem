import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Dish } from 'src/app/model/dish';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.scss'],
})
export class UserorderComponent implements OnInit {
  orders: Order[] = [];
  cartItems: { name: string; price: number }[] = [];
  isOrderPlaced: boolean = false; 
  options: AnimationOptions = {
    path: '/assets/ordered.json',

  };
  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    let app: AppUser = this.storageService.getLoggedInUser();
    this.orderService.getUserOrder(app.id).subscribe({
      next: (response: any) => {
        this.orders = response.data;
      },
    });
    // window.location.reload();
  }

  addToCart(item: { name: string; description: string; price: number }) {
    this.cartItems.push({ name: item.name, price: item.price });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  placeOrder() {
    // Perform order placement logic here
    // For demonstration purposes, let's set a timeout to simulate order placement
    setTimeout(() => {
      this.isOrderPlaced = true;
    }, 2000); // Set a time delay of 2000 milliseconds (2 seconds)
  }
  
}
