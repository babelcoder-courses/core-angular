import { Component } from '@angular/core';

import { AuthService } from '../../shared/auth/auth.service';
import { Credential } from '../shared/credential';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService) { }

    signup({ email, password }: Credential) {
      this.authService.register(email, password);
    }

}
