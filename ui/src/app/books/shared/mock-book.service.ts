import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { BooksResponse } from './books-response';

import 'rxjs/add/observable/of';

@Injectable()
export class MockBookService {

  static BOOKS: Book[] = [
    { id: 1, title: 'Book#1', content: 'Book#1', authorId: 1, categoryId: 1 },
    { id: 2, title: 'Book#2', content: 'Book#2', authorId: 1, categoryId: 2 },
    { id: 3, title: 'Book#3', content: 'Book#3', authorId: 2, categoryId: 1 },
  ];

  static getBooksByAuthorId(authorId: number) {
    return MockBookService.BOOKS.filter(book => book.authorId === authorId);
  }

  getBooks(page = 1, categoryId): Observable<BooksResponse> {
    let books = MockBookService.BOOKS

    if(categoryId) {
      books = books.filter(book => book.categoryId === +categoryId);
    }

    return Observable.of({
      books,
      currentPage: 1,
      totalPages: 1
    });
  }

  getBook(id: number): Observable<Book> {
    const book = MockBookService.BOOKS.find(book => +id === book.id);

    return Observable.of(book);
  }

  createBook(book: Book): Observable<Book> {
    const books = MockBookService.BOOKS;
    const createdBook = {
      id: books.length + 1,
      title: 'Book#1',
      content: 'Book#1',
      authorId: 1,
      categoryId: 1
    };

    MockBookService.BOOKS = [...books, createdBook];

    return Observable.of(createdBook);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    const books = MockBookService.BOOKS;
    const index = books.findIndex(item => item.id === id);

    MockBookService.BOOKS = [
      ...books.slice(0, index),
      book,
      ...books.slice(index + 1)
    ];

    return Observable.of({ id, ...book });
  }

  search(categoryId: number, query: string): Observable<Book[]> {
    const books = MockBookService.BOOKS.filter(book => {
      return categoryId ?
        book.title.includes(query) && +categoryId === book.categoryId :
        book.title.includes(query)
    });

    return Observable.of(books);
  }

}
