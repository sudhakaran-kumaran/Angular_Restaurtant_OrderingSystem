import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Router } from '@angular/router';
import { DishService } from './service/dish.service';
import { Dish } from './model/dish';
import { Observable } from 'rxjs';
import { Cart } from './model/cart';
import { StorageService } from './service/storage.service';
import { AppUser } from './model/appUser';
import { CartService } from './service/cart.service';
import { AppResponse } from './model/appResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  searchTerm: string = '';
  error: string = '';
  isSearchVisible = false;
  userCart: Cart[] = [];
  dishTitle: string = '';
  count=1;
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private router: Router,
    private dishService: DishService,
    private storageservice:StorageService,
    private cartService:CartService
  ) {}
  
  ngOnInit(): void {
    window.onclick = () => this.filterReset();
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
    this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  cart(): void {
    this.router.navigate(['/cart']);
  }
  orders(): void {
    this.router.navigate(['/orders']);
  }
  filterDishes(): void {
    this.filteredDishes = this.dishes.filter((dish) =>
      dish.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.dishes, 'new');

    console.log(this.filteredDishes, 'sdf');
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      // Optionally, you can focus on the input field when it becomes visible
      setTimeout(() => document.querySelector('.search-container input'));
    }
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
  filterReset(): void {
    this.isSearchVisible = false;
    this.searchTerm = '';
    this.filteredDishes = [];
  }
}
