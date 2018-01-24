import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment.prod';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const serverReq = req.clone({
      url: `${environment.hostUrl}${req.url}`
    });

    return next.handle(serverReq);

  }

}
