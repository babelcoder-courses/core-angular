import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Credential } from './shared/credential';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {

  @Input() formName = '';
  @Output() formSubmit = new EventEmitter<Credential>();

  authForm: NgForm;

  onSubmit(credential: Credential) {
    this.formSubmit.emit(credential);
  }

}
