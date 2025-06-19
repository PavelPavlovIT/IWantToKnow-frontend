import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { asyncScheduler, of } from "rxjs";
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { CategoryPageActions } from "../../products/actions/category-page.actions";
import { CategoriesService } from "../../products/services/category.service";
import { Category } from "../../products/models/category";
import { CategoryApiActions } from "../../products/actions/category-api.actions";

import { AccountApiActions } from "../actions/account-api.actions";
import { AccountActions } from "../actions/account.actions";
import { Credentials } from "../models";
import { AccountService } from "../services";
import { LogoutConfirmationComponent } from "../components/logout-confirmation/logout-confirmation.component";
import { UserActions } from "../../core/actions/user.actions";
import { Account } from "../models/account";

@Injectable()
export class AccountEffects {
  // checkAuthenticated$ = createEffect(
  //   () => () =>
  //     this.actions$.pipe(
  //       ofType(AccountActions.checkAuthenticated),
  //       switchMap(() => {
  //         return this.accountService.getAuthenticated().pipe(
  //           map((account: Account) =>
  //             AccountApiActions.checkAuthenticatedSuccess({ account })
  //           ),
  //           catchError((error) =>
  //             of(AccountApiActions.checkAuthenticatedFailure({ error }))
  //           )
  //         );
  //       })
  //     )
  // );

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AccountActions.login),
  //     map((action) => action.credentials),
  //     exhaustMap((auth: Credentials) =>
  //       this.accountService.login(auth).pipe(
  //         map((user) => AccountApiActions.loginSuccess({ user })),
  //         catchError((error) => of(AccountApiActions.loginFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // loginSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AccountApiActions.loginSuccess),
  //       tap(() => this.router.navigate(["/"]))
  //     ),
  //   { dispatch: false }
  // );

  // loginRedirect$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AccountApiActions.loginRedirect, AccountActions.logout),
  //       tap(() => {
  //         this.router.navigate(["/login"]);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationComponent,
          undefined,
          boolean
        >(LogoutConfirmationComponent);

        return dialogRef.afterClosed();
      }),
      map((result) =>
        result
          ? AccountActions.logout()
          : AccountActions.logoutConfirmationDismiss()
      )
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AccountActions.logout())
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog,
    private categoriesService: CategoriesService
  ) {}
}
