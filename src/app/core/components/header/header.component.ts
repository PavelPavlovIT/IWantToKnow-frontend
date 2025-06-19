import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT, NgIf, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Account } from '../../../account/models/account';
import { LoggerService } from '../../services/logger.service';

import * as fromAccount from '../../../account/reducers';
import { AccountService } from '../../../account/services';
import { ResponsiveService } from '../../services/responsive-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  Myprogress: string | undefined = "My progress";
  @Input() isSignedIn: boolean = false;
  @Input() lang: string | undefined = "en";
  id: string | undefined;
  name: string | undefined;


  subscription: Subscription = new Subscription();
  // account$: Observable<Account | null>;
  isMobile: boolean = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private accountService: AccountService,
    private responsiveService: ResponsiveService
    // private store: Store
  ) {

    // this.account$ = this.store.select(fromAccount.selectAccount);
    this.responsiveService.screenWidth$.subscribe(
      value => {
        if (value <= 700) this.isMobile = true;
        else this.isMobile = false;
      }
    )
  }

  getWhereToStartByLanguage() {
    switch (this.lang) {
      case 'es':
        return '¿Por dónde empezar?';
      case 'ru':
        return 'С чего начать?';
      default:
        return 'Where to start?';
    }
  }

  getLogoutByLanguage() {
    switch (this.lang) {
      case 'es':
        return 'Finalizar la sesión';
      case 'ru':
        return 'Выйти';
      default:
        return 'Log out';
    }
  }

  getLoginByLanguage() {
    switch (this.lang) {
      case 'es':
        return 'Acceso';
      case 'ru':
        return 'Авторизоваться';
      default:
        return 'Log in';
    }
  }
  getProfileByLanguage() {
    switch (this.lang) {
      case 'es':
        return 'Tu perfil';
      case 'ru':
        return 'Ваш профиль';
      default:
        return 'Your profile';
    }
  }
  getTestsByLanguage() {
    switch (this.lang) {
      case 'es':
        return 'Aprendiendo';
      case 'ru':
        return 'Изучение';
      default:
        return 'Learning';
    }
  }
}
