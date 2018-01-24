import { Injectable, Inject } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { LOCAL_STORAGE } from '../local-storage/local-storage.provider';
import { LocalStorage } from '../local-storage/local-storage';
import { AuthResponse } from './auth.response';
import { FlashMessageService } from '../../shared/flash-message/shared/flash-message.service';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(!!this.getToken());
  private nextUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessage: FlashMessageService,
    @Inject(LOCAL_STORAGE) private localStorage: LocalStorage) {

  }

  set redirectUrl(url: string) {
    this.nextUrl = url;
  }

  get uid(): string {
    return this.localStorage.getItem('uid');
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    const responseObservable = this
      .http
      .post<AuthResponse>(
        '/api/auth/signin',
        { user: { email, password } },
        { headers: this.httpHeaders(), observe: 'response' }
      );

    this.setTokenAndUidFromResponse(responseObservable);
  }

  logout() {
    this.removeTokenAndUid();
    this.loggedIn.next(false);
  }

  register(email, password) {
    const responseObservable = this
      .http
      .post<AuthResponse>(
        '/api/users',
        { user: { email, password } },
        { headers: this.httpHeaders(), observe: 'response' }
      );

    this.setTokenAndUidFromResponse(responseObservable);
  }

  private httpHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private storeTokenAndUid(token: string, uid: string) {
    this.localStorage.setItem('access-token', token);
    this.localStorage.setItem('uid', uid);
  }

  private removeTokenAndUid() {
    this.localStorage.removeItem('access-token');
    this.localStorage.removeItem('uid');
  }

  private getToken(): string {
    return this.localStorage.getItem('access-token');
  }


  private setTokenAndUidFromResponse(observable: Observable<any>) {
    observable
      .map(
        (res: HttpResponse<any>) => [
          res.headers.get('Authorization'),
          res.body.user.id
        ]
      )
      .map(([token, uid]: string[]) => [token.match(/Bearer (.*)/)[1], uid])
      .subscribe(
        ([token, uid]: string[]) => {
          this.storeTokenAndUid(token, uid);
          this.loggedIn.next(true);
          this.router.navigateByUrl(this.nextUrl || '/');
        },
        (err: HttpErrorResponse) => {
          this.flashMessage.addMessage('danger', err.error.user.errors[0]);
        }
      );
  }

}
