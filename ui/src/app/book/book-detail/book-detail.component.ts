import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';
import { AuthService } from '../../shared/auth.service'

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book;
  private isLoggedIn = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscribeToIsLoggedIn();
    this.subscribeToBook();
  }

  editBook() {
    this.router.navigate(['/books', this.book.id, 'edit']);
  }

  private subscribeToBook() {
    this.route
      .params
      .switchMap(({ id }: Params) => this.bookService.getBook(id))
      .subscribe((book: Book) => this.book = book);
  }

  private subscribeToIsLoggedIn() {
    this.authService
      .isLoggedIn()
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

}
