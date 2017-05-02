import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './auth/shared/auth.service';
import { MockBookService } from './books/shared/mock-book.service';
import { AuthGuard } from './auth/shared/auth.guard';
import { UnsavedChangesGuard } from './shared/unsaved-changes.guard';
import { FlashMessageService } from './flash-message/shared/flash-message.service';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { BookFormComponent } from './books/book-form/book-form.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BookListComponent,
      },
      {
        path: 'new',
        component: BookFormComponent,
        canActivate: [AuthGuard],
        canDeactivate: [UnsavedChangesGuard],
        data: { formType: 'NEW' }
      },
      {
        path: ':id/edit',
        component: BookFormComponent,
        canActivate: [AuthGuard],
        canDeactivate: [UnsavedChangesGuard],
        data: { formType: 'EDIT' }
      },
      {
        path: ':id',
        component: BookComponent,
        children: [
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    BookListComponent,
    PageNotFoundComponent,
    FlashMessageComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    AuthFormComponent,
    CategoriesComponent,
    UsersComponent,
    UserListComponent,
    CategoryListComponent,
    BookFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    UnsavedChangesGuard,
    FlashMessageService,
    MockBookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
