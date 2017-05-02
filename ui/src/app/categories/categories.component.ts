import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MockCategoryService } from './shared/mock-category.service';
import { Category } from './shared/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    MockCategoryService
  ]
})
export class CategoriesComponent implements OnInit {

  categories: Observable<Category[]>;

  constructor(private categoryService: MockCategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

}
