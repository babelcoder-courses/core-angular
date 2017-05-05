import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../shared/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  @Input() categories: Observable<Category[]>;

}
