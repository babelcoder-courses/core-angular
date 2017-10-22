import { LocalStorage } from './local-storage';

export class BrowserLocalStorage implements LocalStorage {
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
