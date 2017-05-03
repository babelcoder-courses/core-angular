import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class MockAuthService {

  loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private router: Router, private http: Http) {

  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    const response: Observable<Response> = this.http
      .post('/api/sessions', { email, password }, options);

    this.setTokenFromResponse(response);
    this.router.navigateByUrl('/');
  }

  logout() {
    this.removeToken();
    this.loggedIn.next(false);
  }

  register(email, password) {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    const response: Observable<Response> = this.http
      .post('/api/users', { email, password }, options);

    this.setTokenFromResponse(response);
    this.router.navigateByUrl('/');
  }

  private removeToken() {
    localStorage.removeItem('access-token');
  }

  private getToken(): string {
    return localStorage.getItem('access-token');
  }

  private storeToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  private setTokenFromResponse(observable: Observable<Response>) {
    observable
      .map(({ headers }: Response) => headers.get('Authorization'))
      .map((token: string) => token.match(/Bearer (.*)/)[1])
      .subscribe((token: string) => {
        this.storeToken(token);
        this.loggedIn.next(true);
      })
  }

}
