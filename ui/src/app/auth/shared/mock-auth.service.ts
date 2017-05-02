import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class MockAuthService {

  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {

  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    this.loggedIn.next(true);
    this.router.navigateByUrl('/');
  }

  logout() {
    this.loggedIn.next(false);
  }

  register(email, password) {
    this.loggedIn.next(true);
    this.router.navigateByUrl('/');
  }

}
