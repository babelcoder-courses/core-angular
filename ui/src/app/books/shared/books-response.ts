import { Book } from './book';

export interface BooksResponse {
  books: Book[];
  currentPage: number;
  totalPages: number;
}
