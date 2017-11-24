import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { CategoriesResponse } from './categories-response';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoriesResponse>('/api/categories')
      .map(data => data.categories);
  }

}
