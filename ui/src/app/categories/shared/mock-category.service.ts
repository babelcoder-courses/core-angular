import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

import 'rxjs/add/observable/of';

@Injectable()
export class MockCategoryService {

  static CATEGORIES: Category[] = [
    { id: 1, title: 'Programming Language' },
    { id: 2, title: 'DevOps' }
  ];

  getCategories(): Observable<Category[]> {
    return Observable.of(MockCategoryService.CATEGORIES);
  }

}
