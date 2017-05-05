import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [
    UserService
  ]
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

}
