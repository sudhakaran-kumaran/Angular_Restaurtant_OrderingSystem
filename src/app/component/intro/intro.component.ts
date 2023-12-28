import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { DishService } from 'src/app/service/dish.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  searchTerm: string = '';
  isSearchVisible = false;
  constructor(private dishService:DishService){}
  ngOnInit(): void {
    this.dishService.getAllDish().subscribe({
      next: (response: any) => {
        this.dishes = response.data;
        console.log('dishessss', this.dishes);
      },
      

      
    });
    setTimeout(() => {
      // Show the pop-up message
      const popupComponent = new PopupComponent(); // Instantiate the component
      // You can append the component to the DOM, trigger a modal, or use any other method to display the pop-up
    }, 5000);
  }
  filterDishes(): void {
    this.filteredDishes = this.dishes.filter((dish) =>
      dish.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      // Optionally, you can focus on the input field when it becomes visible
      setTimeout(() => document.querySelector('.search-container input'));
    }
  }

}
