import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { AuthHttpService } from '../../shared/auth-http.service';

@Injectable()
export class CategoryService {

  constructor(private http: AuthHttpService) {

  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get('/api/categories')
      .map((res: Response) => res.json().categories as Category[])
  }

}
