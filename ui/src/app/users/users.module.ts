import { NgModule } from '@angular/core';

import { UserRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './shared/user.service';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
