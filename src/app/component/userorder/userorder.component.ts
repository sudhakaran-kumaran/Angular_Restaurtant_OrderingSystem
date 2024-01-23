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

    setTimeout(() => {
      console.log('Delayed for 1 second.');
      this.onStatusChange(this.orders);
    }, 5000);
  }

  addToCart(item: { name: string; description: string; price: number }) {
    this.cartItems.push({ name: item.name, price: item.price });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  onStatusChange(orders: Order[]): void {
    // Update the order status on the user side
    orders.forEach((order) => {
      this.orderService
        .updateOrderStatus(order.id!, 4) // Assuming the second argument is the new status
        .subscribe({
          next: (response: any) => {
            this.orders = response.data;
          },
          error: (error) => {
            console.error('Error updating order status:', error);
          },
        });
    });
  }
}
