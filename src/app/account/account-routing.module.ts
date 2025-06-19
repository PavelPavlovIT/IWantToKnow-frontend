import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LogoutConfirmationComponent } from './components/logout-confirmation/logout-confirmation.component';
import {AccountPageComponent} from "./components/account-page/account-page.component";
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  { path: 'register', component: RegistrationFormComponent, data: { title: 'Registration' } },
  { path: 'forgot', component: ForgotPasswordComponent, data: { title: 'Password recovery' } },
  { path: 'reset/:userId/:token', component: ResetPasswordComponent, data: { title: 'Reset password' } },
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  { path: 'logout', component: LogoutConfirmationComponent, data: { title: 'Log out' } },
  { 
    
    path: 'confirm-email/:userid/:code',
    component: ConfirmEmailComponent, 
    data: { title: 'Confirm email' } 
  },
  // { path: '**', redirectTo: '/login' },
  { 
    path: 'page', 
    component: AccountPageComponent, 
    canActivate: [AuthGuard],
    data: { title: 'Account' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
