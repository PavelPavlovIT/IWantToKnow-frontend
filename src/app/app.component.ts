import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app/reducers/";
import * as fromAuth from "./account/reducers";
import { Observable, Subject, takeUntil } from "rxjs";
import { AccountActions } from "./account/actions/account.actions";
import { Account } from "./account/models/account";
import { LoggerService } from "./core/services/logger.service";
import { AccountService } from "./account/services";
import { UserInfo } from "./account/models";
import { ResponsiveService } from "./core/services/responsive-service";
import { LoadingIndicatorComponent } from './core/components/loading-indicator-component/loading-indicator-component.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  // showSidenav$: Observable<boolean>;
  // loggedIn$: Observable<boolean>;
  // Account$: Observable<Account | null>;
  title = "I Want to know";
  unsubscribe = new Subject<void>();
  loading = true;

  public isSignedIn: boolean = false;
  public userInfo: UserInfo | null = null;
  lang: string | undefined = "en";
  isMobile: boolean = false;

  constructor(
    private logger: LoggerService,
    private accountService: AccountService,
    private responsiveService: ResponsiveService,
    // private store: Store
  ) {

    // this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
    // this.loggedIn$ = this.store.select(fromAuth.selectLoggedIn);
    // this.Account$ = this.accountService.Account$;
  }

  ngOnInit(): void {
    this.responsiveService.screenWidth$.subscribe(
      value => {
        if (value <= 700) this.isMobile = true;
        else this.isMobile = false;
        this.responsiveService.isMobile = this.isMobile;
      }
    )

    this.accountService.onStateChanged().forEach((state: any) => {
      this.accountService.isSignedIn().forEach((userInfo) => {
        const valid = !!(userInfo && userInfo.email && userInfo.email.length > 0);
        this.isSignedIn = valid;
        this.userInfo = userInfo;
      });
    });
  }
}
