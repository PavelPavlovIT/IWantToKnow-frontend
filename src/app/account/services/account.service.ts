import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, Subject, throwError } from "rxjs";

import { Credentials, ForgotPassword, RegistrationUser, ResetPassword, User, UserInfo } from "../models";
import { DOCUMENT } from "@angular/common";
import { environment } from "../../environments/environment";
import { LoggerService } from "../../core/services/logger.service";
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Account } from "../models/account";
import * as fromAuth from "../reducers";
import { Store } from "@ngrx/store";
import { SkipLoading } from "../../interceptors/loading.interceptor ";


@Injectable({
  providedIn: "root",
})

export class AccountService {
  public Language: string = "en";

  public user() {
    var offset = new Date().getTimezoneOffset();
    const url = `${environment.apiUrl}/Account/GetAccount`;
    return this.httpClient.get<UserInfo>(url,
      {
        context: new HttpContext().set(SkipLoading, true),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'sameSite':'none'},
        withCredentials: true,
      }).pipe(
        catchError((response: HttpErrorResponse, user: Observable<UserInfo>) => {
          return of({ email: "" } as UserInfo);
        }));
  }

  public onStateChanged() {
    return this._authStateChanged.asObservable();
  }

  isSignedIn(): Observable<UserInfo | null> {
    return this.user().pipe(
      map((userInfo) => {
        this.Language = userInfo.language;
        return userInfo;
      }),
      catchError((_) => {
        return of(null);
      }));

  }
  public UserInfo$: Observable<UserInfo | null>;
  // public Account$: Observable<Account | null>;
  private _authStateChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService,
    private httpClient: HttpClient,
    // private store: Store
  ) {
    // this.Account$ = this.store.select(fromAuth.selectAccount);
    this.UserInfo$ = this.isSignedIn();

  }

  public register(registrationUser: RegistrationUser) {
    const url = `${environment.apiUrl}/Account/register`;
    return this.httpClient
      .post(url, registrationUser,
        { observe: 'response', responseType: 'text', withCredentials: true })
      .pipe<boolean>(
        map((res: HttpResponse<string>) => {
          return res.ok;
        }));
  }

  public forgotPassword(model: ForgotPassword) {
    const url = `${environment.apiUrl}/Account/ForgotPassword`;
    return this.httpClient
      .post(url, model,
        { observe: 'response', responseType: 'text', withCredentials: true })
      .pipe<boolean>(
        map((res: HttpResponse<string>) => {
          return res.ok;
        }));
  }

  public resetPassword(model: ResetPassword) {
    const url = `${environment.apiUrl}/Account/ResetPassword`;
    return this.httpClient
      .post(url, model,
        { observe: 'response', responseType: 'text', withCredentials: true })
      .pipe<boolean>(
        map((res: HttpResponse<string>) => {
          return res.ok;
        }));
  }

  public signIn(email: string | null, password: string | null) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
      responseType: 'text'
    };
    const url = `${environment.apiUrl}/login?useCookies=true`;
    return this.httpClient.post(url, JSON.stringify({
      email: email,
      password: password
    })
      , {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Sec-fetch-site': 'same-origin' },
        withCredentials: true,
        observe: 'response',
        responseType: 'text'
      }
    )
      .pipe<boolean>(map((res: HttpResponse<string>) => {
        this._authStateChanged.next(res.ok);
        return res.ok;
      }));
  }

  logout() {
    this.document.location.href = `${environment.apiUrl}/account/logout`;
  }

  loginGoogle(selectedValue: string) {
    this.document.location.href = `${environment.apiUrl}/account/SignInWithGoogle?lang=${selectedValue}`;
  }

  setLanguage(lang: string) {
    const url = `${environment.apiUrl}/account/setLanguage?language=${lang}`;
    return this.httpClient
      .get(url, { withCredentials: true })
      .pipe(map((obj) => obj || null));
  }

  toCategories() {
    this.document.location.href = `products/categories`;
  }
}
