import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BookFormComponent } from '../book/book-form/book-form.component';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<BookFormComponent> {
  canDeactivate(component: BookFormComponent): boolean {
    return component.canDeactivate() ||
      window.confirm("You have unsaved changes. Still want to leave?");
  }
}
