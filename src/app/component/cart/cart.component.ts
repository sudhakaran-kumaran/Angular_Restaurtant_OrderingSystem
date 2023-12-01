import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Dish } from 'src/app/model/dish';
import { Order } from 'src/app/model/order';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private orderService:OrderService
  ) {}
  error: string = '';
  carts: Cart[] = [];
  statusId:number=0;
  orderStatus:string="";
  dish:string='';
  emptyCart:Boolean=true;
  userOrder:Order[]=[];
  currentorder:Order|undefined;
  userId: number = this.storageService.getLoggedInUser().id;
  Total:number=0;
  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this.cartService.getUserCart(this.userId).subscribe({
      next: (response: any) => {
        this.carts = response.data.cartRequests;
        // console.log(response);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  AddtoCart(id: number) {
    let user: AppUser = this.storageService.getLoggedInUser();
    const existingCartItem = this.carts.find(
      (cartItem) => cartItem.dishId === id
    );
    if (existingCartItem) {
      existingCartItem.count++;
    } else {
      const Cart: Cart = {
        id: 0,
        userId: user.id,
        dishId: id,
        dish: {
          id: 0,
          title: '',
          categoryId: 0,
          description: '',
          price: 0,
          
        },
        dishTitle: '',
        count: 0,
        price: 0,
      };
      console.log(Cart);

      this.cartService.addCart(Cart).subscribe({
        next: (response: AppResponse) => {
          this.carts.push(response.data);
          console.log('carts..', this.carts);
          this.ngOnInit();
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    }
  }
  loadUserDetails() {
    const userId = this.storageService.getLoggedInUser().id;
    this.userService.getAllUsers().subscribe((response: AppResponse) => {
      if (response && response.data && Array.isArray(response.data)) {
        const loguser=this.storageService.getLoggedInUser();
        if(loguser){
          const order={
            userId:3,
            tableId:1
          };
          this.orderService.postOrder(order).subscribe({
            next:(response:AppResponse)=>{
              this.currentorder=response.data;
              this.carts=[];
              this.emptyCart=true;
            }
          })
        }
      }
    });
  }
  checkout(): void {
    const user = this.storageService.getLoggedInUser();
    if (user) {
      this.loadUserDetails();
    }
  }
  placeorder(): void {}
  back(): void {
    this.router.navigate(['/home']);
  }
}
