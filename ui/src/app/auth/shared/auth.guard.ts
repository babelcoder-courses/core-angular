import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { FlashMessageService } from '../../flash-message/shared/flash-message.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessageService: FlashMessageService
  ) {
    this.authService
      .isLoggedIn()
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.isLoggedIn) return true;

    this.flashMessageService.addMessage('danger', 'Not Allowed');
    this.router.navigate(['/']);
    return false;
  }
}
