import { Component, OnInit } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { CategoryService } from './shared/category.service';
import { Category } from './shared/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    CategoryService
  ]
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  private CATEGORIES_KEY = makeStateKey<Category[]>('categories');

  constructor(
    private categoryService: CategoryService,
    private state: TransferState
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    const categories = this.state.get(this.CATEGORIES_KEY, undefined);

    if(categories) {
      this.categories = categories;
    } else {
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
        this.state.set(this.CATEGORIES_KEY, this.categories);
      });
    }
  }

}
