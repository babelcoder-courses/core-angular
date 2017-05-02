import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable()
export class CategoryService {

  constructor(private http: Http) {

  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get('/api/categories')
      .map((res: Response) => res.json().categories as Category[])
  }

}
