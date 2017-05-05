import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookComponent } from './book/book.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookService } from './shared/book.service';
import { CategoriesModule } from '../categories/categories.module';

@NgModule({
  imports: [
    SharedModule,
    CategoriesModule,
    BooksRoutingModule
  ],
  declarations: [
    BooksComponent,
    BookComponent,
    BookFormComponent,
    BookListComponent
  ],
  providers: [
    BookService
  ]
})
export class BooksModule { }
