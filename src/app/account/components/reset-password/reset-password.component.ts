import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistrationUserForm, ForgotPasswordForm, ResetPasswordForm, ForgotPassword, ResetPassword, RegistrationUser } from '../../models';
import { Language } from '../../models/language';
import { AccountService } from '../../services';
import { NgIf, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
  ],

  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  resetPasswordForm = new FormGroup<ResetPasswordForm>({
    userId: new FormControl(""),
    token: new FormControl(""),
    newPassword: new FormControl(""),
    confirmPassword: new FormControl("")
  });

  errors: string[] = [];
  resetPasswordSucceeded: boolean = false;
  resetPasswordFailed: boolean = false;
  signedIn: boolean = false;
  type: string = "";
  userId: string = "";
  token: string = "";

  hide = true;
  get passwordInputRegister() { return this.resetPasswordForm.controls.newPassword == null || this.resetPasswordForm.controls.newPassword?.value == ''; }
  get confirmPasswordInputRegister() { return this.resetPasswordForm.controls.confirmPassword == null || this.resetPasswordForm.controls.confirmPassword?.value == ''; }

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.route.params.subscribe((params) => {
      this.userId = params['userId'] === 'undefined' ? '' : params['userId'];
      this.token = params['token'] === 'undefined' ? '' : params['token'];
    });

    this.accountService.isSignedIn().forEach(
      userInfo => {
        const valid = !!(userInfo && userInfo.email && userInfo.email.length > 0);
        this.signedIn = valid;
      });
  }
  ngAfterViewInit() {

  }
  ValidatePassword(): boolean {
    let password = this.resetPasswordForm.controls.newPassword.value == undefined ? "" : this.resetPasswordForm.controls.newPassword.value;

    if (this.resetPasswordForm.controls.confirmPassword.value == this.resetPasswordForm.controls.newPassword.value) {
      if (password.length < 6) {
        return false;
      };

      return true;
    };
    return false;;
  }
  ResetPassword() {
    this.resetPasswordSucceeded = false;
    this.resetPasswordFailed = false;
    this.errors = [];

    const model = this.resetPasswordForm.value as ResetPassword;
    model.userId = this.userId;
    model.token = this.token;
    this.accountService.resetPassword(model).forEach(
      response => {
        if (response) {
          this.resetPasswordSucceeded = true;
        }
      }
    ).catch(
      error => {
        this.resetPasswordFailed = true;
        if (error.error) {
          const errorObj = JSON.parse(error.error);
          if (errorObj) {
            if (errorObj.errors) {
              const errorList = errorObj.errors;
              for (let field in errorList) {
                let list = errorList[field] as { code: string, description: string };
                this.errors.push(`${list.description}`);
              }
            } else {
              for (let field in errorObj) {
                let list = errorObj[field] as { code: string, description: string };
                this.errors.push(`${list.description}`);
              }
            }
          }
        } else {
          this.errors.push(`${error}`);
        }
      })

  }

}
