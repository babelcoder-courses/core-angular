import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { BooksResponse } from './books-response';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  constructor(private http: Http) {}

  getBooks(page = 1, categoryId): Observable<BooksResponse> {
    const options = new RequestOptions({ params: { page, categoryId } });

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
    return this.http
      .post('/api/books', { ...book }, this.getRequestOptions())
      .map((res: Response) => res.json().book as Book);
  }

  updateBook(id: number, book: Book) {
    return this.http
      .patch(`/api/books/${id}`, { ...book }, this.getRequestOptions())
  }

  search(categoryId: string, query: string) {
    const params = categoryId ? { categoryId, query } : { query };
    const options = new RequestOptions({ params });

    return this.http
      .get('/api/books/search', options)
      .map((res: Response) => res.json().books as Book[])
  }

  private getRequestOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return new RequestOptions({ headers });
  }
}
