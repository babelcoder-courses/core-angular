import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get('/api/users')
      .map((res: Response) => res.json().users as User[])
  }

}
