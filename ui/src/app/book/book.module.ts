import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookService } from './shared/book.service';
import { CategoryModule } from '../category/category.module';

@NgModule({
  imports: [
    SharedModule,
    BookRoutingModule,
    CategoryModule
  ],
  declarations: [
    BooksComponent,
    BookDetailComponent,
    BookFormComponent,
    BookListComponent
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
