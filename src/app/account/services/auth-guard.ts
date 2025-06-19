import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountApiActions } from '../actions/account-api.actions';
import * as fromAccount from '../reducers';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate() {
    return this.isSignedIn();
  }

  isSignedIn(): Observable<boolean> {
    return this.accountService.isSignedIn().pipe(
      map((userInfo) => {
        if (userInfo?.email == "") {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }));
  }
}
