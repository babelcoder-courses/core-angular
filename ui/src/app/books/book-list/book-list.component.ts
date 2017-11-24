import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { Book } from '../shared/book';
import { BookService } from '../shared/book.service';
import { AuthService } from '../../shared/auth.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books = new BehaviorSubject<Book[]>([]);
  currentPage: number;
  totalPages: number[];

  private searchTermStream = new Subject<string>();
  private isLoggedIn = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscribeToIsLoggedIn();
    this.subscribeToParams();
    this.handleSearchTerm();
  }

  search(query: string) {
    this.searchTermStream.next(query);
  }

  private handleSearchTerm() {
    this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(
        (query: string) => this.bookService
          .search(this.route.snapshot.queryParams.categoryId, query)
      )
      .subscribe((books: Book[]) => this.books.next(books));
  }

  private subscribeToIsLoggedIn() {
    this.authService
      .isLoggedIn()
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  private subscribeToParams() {
    this.route.queryParams.subscribe(
      ({ page, categoryId }) => this.loadBooks(page, categoryId)
    );
  }

  private loadBooks(page = 1, categoryId) {
    this.bookService
      .getBooks(page, categoryId)
      .subscribe(({ books, currentPage, totalPages }) => {
        this.books.next(books);
        this.currentPage = currentPage;
        this.totalPages
          = Array.from({ length: totalPages }, (_, index) => index + 1)
      })
  }

}
