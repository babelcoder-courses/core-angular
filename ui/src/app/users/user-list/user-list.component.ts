import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MockUserService } from '../shared/mock-user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [
    MockUserService
  ]
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: MockUserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

}
