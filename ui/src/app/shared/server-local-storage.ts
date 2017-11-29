import { LocalStorage } from './local-storage';

export class ServerLocalStorage implements LocalStorage {
  getItem(key: string) {}
  setItem(key: string, value: any) {}
  removeItem(key: string) {}
}
