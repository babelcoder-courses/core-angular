import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthGuard } from '../shared/auth.guard';
import { UnsavedChangesGuard } from '../shared/unsaved-changes.guard';

@NgModule({
  imports: [RouterModule.forChild([
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
          component: BookDetailComponent
        }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class BookRoutingModule {}
