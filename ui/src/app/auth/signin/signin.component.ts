import { Component } from '@angular/core';

import { AuthService } from '../../shared/auth/auth.service';
import { Credential } from '../shared/credential';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private authService: AuthService) { }

  signin({ email, password }: Credential) {
    this.authService.login(email, password);
  }

}
