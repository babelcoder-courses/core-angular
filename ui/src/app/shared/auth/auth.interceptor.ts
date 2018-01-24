import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LOCAL_STORAGE } from '../local-storage/local-storage.provider';
import { LocalStorage } from '../local-storage/local-storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: LocalStorage) {
  }

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorage.getItem('access-token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);

  }
}
