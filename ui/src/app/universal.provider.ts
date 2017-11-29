import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UniversalInterceptor } from './universal.interceptor';

export const UNIVERSAL_HTTP_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: UniversalInterceptor,
  multi: true
}
