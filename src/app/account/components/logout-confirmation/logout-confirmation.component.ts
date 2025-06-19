import { Component } from '@angular/core';
import { AccountService } from '../../services';

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrl: './logout-confirmation.component.scss',
})
export class LogoutConfirmationComponent {
  constructor(private accountService: AccountService) {}

  OK() {
    this.accountService.logout();
  }
}
