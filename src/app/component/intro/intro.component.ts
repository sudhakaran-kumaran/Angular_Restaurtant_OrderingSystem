import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { DishService } from 'src/app/service/dish.service';

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
  showPopup = false; // New variable to control the visibility of the popup
  

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.dishService.getAllDish().subscribe({
      next: (response: any) => {
        this.dishes = response.data;
        console.log('dishessss', this.dishes);
      },
    });

    // Show popup after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      this.showPopup = true;
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
  itemsPerPage: number = 4;
  currentPage: number = 1;
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.dishes.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
 
  //returns last page
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }
}
