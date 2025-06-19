import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { AccountEffects } from './effects';
import * as fromAccount from '../account/reducers';
import { MaterialModule } from '../material';
import { AccountRoutingModule } from './account-routing.module';
import {LogoutConfirmationComponent} from "./components/logout-confirmation/logout-confirmation.component";
import {CdkOption} from "@angular/cdk/listbox";
import {MatOption, MatSelect} from "@angular/material/select";


export const COMPONENTS = [
  LoginPageComponent,
  LogoutConfirmationComponent,
];

export const CONTAINERS = [
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountRoutingModule,
    // EffectsModule.forFeature(AccountEffects),
    CdkOption,
    MatSelect,
    FormsModule,
    MatOption,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class AccountModule {}
