import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isLoggedIn: boolean;
  @Output() logout = new EventEmitter<null>();

  public isCollapsed = true;

  onLogout() {
    this.logout.emit();
  }

}
