import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.scss'],
})
export class UserorderComponent  implements OnInit {
  orders:Order[]=[];

  constructor(private orderService:OrderService,private storageService:StorageService) { }

  ngOnInit() {
    let app:AppUser=this.storageService.getLoggedInUser();
    this.orderService.getUserOrder(app.id).subscribe({
      next: (response: any) => {
        
      },

      
    });
  }
  menuItems: { name: string; description: string; price: number }[] = [
    { name: 'Burger', description: 'Delicious burger with fries', price: 10.99 },
    { name: 'Pizza', description: 'Classic pizza with your favorite toppings', price: 15.99 },
    
  ];

  cartItems: { name: string; price: number }[] = [];

  addToCart(item: { name: string; description: string; price: number }) {
    this.cartItems.push({ name: item.name, price: item.price });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
