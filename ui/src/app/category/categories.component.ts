import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  categories: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

}
