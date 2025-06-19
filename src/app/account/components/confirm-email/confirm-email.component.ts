import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {
  userId: string = "";
  code: string = "";
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private accountService: AccountService,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userId = params['userid'] === 'undefined' ? '' : params['userid'];
      this.code = params['code'] === 'undefined' ? '' : params['code'];
    });


  }
}
