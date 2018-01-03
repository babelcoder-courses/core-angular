import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageEvent } from '@angular/material';

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
  categoryId: number;
  books = new BehaviorSubject<Book[]>([]);
  currentPage: number;
  totalLength: number;
  pageSize: number;

  private searchTermStream = new Subject<string>();
  isLoggedIn = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscribeToIsLoggedIn();
    this.subscribeToParams();
    this.handleSearchTerm();
  }

  search(query: string) {
    this.searchTermStream.next(query);
  }

  onPageUpdated(page: PageEvent) {
    const queryParams: { [key: string]: number } = { page: page.pageIndex };

    if (this.categoryId) {
      queryParams.categoryId = this.categoryId;
    }

    this.router.navigate(['/books'], { queryParams });
  }

  private handleSearchTerm() {
    this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((query: string) =>
        this.bookService.search(
          this.route.snapshot.queryParams.categoryId,
          query
        )
      )
      .subscribe((books: Book[]) => this.books.next(books));
  }

  private subscribeToIsLoggedIn() {
    this.authService
      .isLoggedIn()
      .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  private subscribeToParams() {
    this.route.queryParams.subscribe(({ page, categoryId }) => {
      this.categoryId = categoryId;
      this.loadBooks(page);
    });
  }

  private loadBooks(page = 1) {
    this.bookService
      .getBooks(page, this.categoryId)
      .subscribe(({ books, currentPage, totalLength, pageSize }) => {
        this.books.next(books);
        this.currentPage = currentPage;
        this.totalLength = totalLength;
        this.pageSize = pageSize;
      });
  }
}
