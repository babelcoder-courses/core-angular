import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`http://127.0.0.1:8080${req.url}`)
    const serverReq = req.clone({
      url: `http://127.0.0.1:8080${req.url}`
    });

    return next.handle(serverReq);

  }

}
