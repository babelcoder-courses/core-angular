import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() isLoggedIn: boolean;
  @Output() logout = new EventEmitter<null>();

  onLogout() {
    this.logout.emit();
  }

}
