import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { LOCAL_STORAGE } from './local-storage.provider';
import { LocalStorage } from './local-storage';

@Injectable()
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private localStorage: LocalStorage) {

  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    const responseObservable = this
      .http
      .post(
        '/api/sessions',
        { email, password },
        { headers: this.httpHeaders(), observe: 'response' }
      );

    this.setTokenFromResponse(responseObservable);
    this.router.navigateByUrl('/');
  }

  logout() {
    this.removeToken();
    this.loggedIn.next(false);
  }

  register(email, password) {
    const responseObservable = this
      .http
      .post(
        '/api/users',
        { email, password },
        { headers: this.httpHeaders(), observe: 'response' }
      );

    this.setTokenFromResponse(responseObservable);
    this.router.navigateByUrl('/');
  }

  private httpHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private storeToken(token: string) {
    this.localStorage.setItem('access-token', token);
  }

  private removeToken() {
    this.localStorage.removeItem('access-token');
  }

  private getToken(): string {
    return this.localStorage.getItem('access-token');
  }

  private setTokenFromResponse(observable: Observable<any>) {
    observable
      .map(({ headers }: HttpResponse<any>) => headers.get('Authorization'))
      .map((token: string) => token.match(/Bearer (.*)/)[1])
      .subscribe((token: string) => {
        this.storeToken(token);
        this.loggedIn.next(true);
      });
  }

}
