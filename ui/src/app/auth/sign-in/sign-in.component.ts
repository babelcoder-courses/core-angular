import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Credential } from '../auth-form/shared/credential';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private authService: AuthService) {

  }

  signin({ email, password }: Credential) {
    this.authService.login(email, password);
  }

}
