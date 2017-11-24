import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { BooksResponse } from './books-response';
import { BookResponse } from './book-response';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(page = 1, categoryId) {
    let params = new HttpParams();

    params = categoryId ?
      params.set('categoryId', `${categoryId}`).set('page', `${page}`) :
      params.set('page', `${page}`)

    return this.http
      .get<BooksResponse>('/api/books', { params } )
      .map(({ books, meta: { page, totalPages } }) => ({
        books,
        currentPage: page,
        totalPages
      }));
  }

  getBook(id: number): Observable<Book> {
    return this.http
      .get<BookResponse>(`/api/books/${id}`)
      .map(res => res.book)
  }

  createBook(book: Book): Observable<Book> {
    return this.http
      .post<BookResponse>('/api/books', book,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .map(res => res.book);
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
    let params = new HttpParams();

    params = categoryId ?
      params.set('categoryId', `${categoryId}`).set('query', query) :
      params.set('query', query)

    return this.http
      .get<BooksResponse>('/api/books/search', { params })
      .map(data => data.books)
  }
}
