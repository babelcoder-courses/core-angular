import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanComponentDeactivate } from './can-component-deactivate';

@Injectable()
export class UnsavedChangesGuard implements
  CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate):
    Observable<boolean> | Promise<boolean> | boolean {
    if (component.canDeactivate && component.canDeactivate()) { return true; }

    return window.confirm('You have unsaved changes. Still want to leave?');
  }
}
