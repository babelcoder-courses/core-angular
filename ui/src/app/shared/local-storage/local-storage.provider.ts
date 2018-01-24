import { InjectionToken  } from '@angular/core';

import { LocalStorage } from './local-storage';
import { ServerLocalStorage } from './server-local-storage';
import { BrowserLocalStorage } from './browser-local-storage';

export const LOCAL_STORAGE = new InjectionToken<LocalStorage>('LocalStorage');

export const BROWSER_LOCAL_STORAGE = {
  provide: LOCAL_STORAGE,
  useClass: BrowserLocalStorage
};

export const SERVER_LOCAL_STORAGE = {
  provide: LOCAL_STORAGE,
  useClass: ServerLocalStorage
};
