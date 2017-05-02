import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Credential } from '../auth-form/shared/credential';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private authService: AuthService) {

  }

  signup({ email, password }: Credential) {
    this.authService.register(email, password);
  }

}
