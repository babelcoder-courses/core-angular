import { Injectable } from '@angular/core';
import { AuthInterceptor } from '../../shared/auth.interceptor';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { BookResponse } from './book-response';
import { BooksResponse } from './books-response';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(page = 1, categoryId) {
    const params = new HttpParams();

    params.set('page', `${page}`).set('categoryId', `${categoryId}`);

    return this.http
      .get<BooksResponse>('/api/books', { params })
      .map(({ books, meta: { page, totalPages } }) => ({
        books,
        currentPage: page,
        totalPages
      }));
  }

  getBook(id: number): Observable<Book> {
    return this.http
      .get<BookResponse>(`/api/books/${id}`)
      .map(data => data.book)
  }

  createBook(book: Book): Observable<Book> {
    return this.http
      .post<BookResponse>(
        '/api/books',
        book,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map(data => data.book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http
      .patch<BookResponse>(
        `/api/books/${id}`,
        book,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map(data => data.book);
  }

  search(categoryId: number, query: string): Observable<Book[]> {
    const params = new HttpParams();

    if(categoryId) {
      params.set('categoryId', `${categoryId}`).set('query', query);
    } else {
      params.set('query', query);
    }

    return this.http
      .get<BooksResponse>('/api/books/search', { params })
      .map(data => data.books)
  }
}
