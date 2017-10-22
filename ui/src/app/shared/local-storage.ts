export interface LocalStorage {
  getItem(string): any;
  setItem(string, any): void
  removeItem(string): void
}
