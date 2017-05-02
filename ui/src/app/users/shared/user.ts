import { Book } from '../../books/shared/book';

export interface User {
  id: number;
  email: string;
  books: Book[];
}
