import { Book } from '../../book/shared/book';

export interface User {
  id: number;
  email: string;
  books: Book[];
}
