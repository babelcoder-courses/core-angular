import { Book } from './book';

export interface BooksResponse {
  books: Book[];
  meta: {
    page: number;
    totalPages: number;
    perPage: number;
  };
}
