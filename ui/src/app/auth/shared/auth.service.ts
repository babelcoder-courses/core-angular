import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private http: Http, private router: Router) {

  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    const responseObservable = this.http
      .post('/api/sessions', { email, password }, this.httpOptions());

    this.setTokenFromResponse(responseObservable);
    this.router.navigateByUrl('/');
  }

  logout() {
    this.removeToken();
    this.loggedIn.next(false);
  }

  register(email, password) {
    const responseObservable = this.http
      .post('/api/users', { email, password }, this.httpOptions());

    this.setTokenFromResponse(responseObservable);
    this.router.navigateByUrl('/');
  }

  private httpOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return new RequestOptions({ headers });
  }

  private storeToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  private removeToken() {
    localStorage.removeItem('access-token');
  }

  private getToken(): string {
    return localStorage.getItem('access-token');
  }

  private setTokenFromResponse(observable: Observable<Response>) {
    observable
      .map(({ headers }: Response) => headers.get('Authorization'))
      .map((token: string) => token.match(/Bearer (.*)/)[1])
      .subscribe((token: string) => {
        this.storeToken(token);
        this.loggedIn.next(true);
      });
  }

}
