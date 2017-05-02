import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { MockBookService } from '../../books/shared/mock-book.service';

@Injectable()
export class MockUserService {

  static USERS: User[] = [
    {
      id: 1,
      email: 'myemail1@company.com',
      books: MockBookService.getBooksByAuthorId(1)
    }, {
      id: 2,
      email: 'myemail2@company.com',
      books: MockBookService.getBooksByAuthorId(2)
    }
  ];

  getUsers(): Observable<User[]> {
    return Observable.of(MockUserService.USERS);
  }

}
