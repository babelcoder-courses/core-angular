import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response, Headers } from '@angular/http';
import { AuthHttpService } from '../../shared/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { BooksResponse } from './books-response';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  constructor(private http: AuthHttpService) {}

  getBooks(page = 1, categoryId): Observable<BooksResponse> {
    const options: RequestOptionsArgs = { params: { page, categoryId } };

    return this.http
      .get('/api/books', options)
      .map((res: Response) => res.json())
      .map(({ books, meta: { page, totalPages } }) => ({
        books,
        currentPage: page,
        totalPages
      }));
  }

  getBook(id: number): Observable<Book> {
    return this.http
      .get(`/api/books/${id}`)
      .map((res: Response) => res.json().book as Book)
  }

  createBook(book: Book): Observable<Book> {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post('/api/books', book, options)
      .map((res: Response) => res.json().book as Book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    return this.http
      .patch(`/api/books/${id}`, book, options)
      .map((res: Response) => res.json().book as Book);
  }

  search(categoryId: number, query: string): Observable<Book[]> {
    const options: RequestOptionsArgs =
      { params: categoryId ? { categoryId, query } : { query} };

    return this.http
      .get('/api/books/search', options)
      .map((res: Response) => res.json().books as Book[])
  }
}
