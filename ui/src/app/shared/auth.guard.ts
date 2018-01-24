import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FlashMessageService } from './flash-message/shared/flash-message.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashService: FlashMessageService
  ) {
    authService
      .isLoggedIn()
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  private checkLogin(url): boolean {
    if (this.isLoggedIn) { return true; }

    this.flashService.addMessage('danger', 'Not Allowed');
    this.authService.redirectUrl = url;
    this.router.navigateByUrl('/auth/signin');

    return false;
  }
}
