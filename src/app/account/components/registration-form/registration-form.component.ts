import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ForgotPassword, ForgotPasswordForm, RegistrationUser, RegistrationUserForm, ResetPassword, ResetPasswordForm } from '../../models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { NavigationHeaderCategoryComponent } from '../../../core/components/navigation-header-category/navigation-header-category.component';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Language } from '../../models/language';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { userInfo } from 'os';
import { LoadingService } from '../../../core/services/loading-service ';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registration-form',
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
    MatOption,
    MatSelect,
    MatIconModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  languages: Language[] = [
    { value: 'en', viewValue: 'En' },
    { value: 'es', viewValue: 'Es' },
    { value: 'ru', viewValue: 'Ru' },
  ];
  selectedValue = this.languages[0].value;

  registerForm = new FormGroup<RegistrationUserForm>({
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    language: new FormControl("en")
  });

  errors: string[] = [];

  registerFailed: boolean = false;
  registerSucceeded: boolean = false;
  signedIn: boolean = false;
  type: string = "";
  userId: string = "";
  token: string = "";

  hide = true;
  get emailInputRegister() { return this.registerForm.get('email'); }
  get passwordInputRegister() { return this.registerForm.controls.password == null || this.registerForm.controls.password?.value == ''; }
  get confirmPasswordInputRegister() { return this.registerForm.controls.confirmPassword == null || this.registerForm.controls.confirmPassword?.value == ''; }
  test: string = "hint-error";

  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.selectedValue = this.languages[0].value;
  }

  ValidateEmail(): boolean {
    if (this.type = 'register') {
      if (this.registerForm.controls.email.valid) return true;
    } else
      if (this.type = 'forgot') {
        if (this.registerForm.controls.email.valid) return true;
      }
    return false;
  }

  ValidatePassword(): boolean {
    let password = this.registerForm.controls.password.value == undefined ? "" : this.registerForm.controls.password.value;

    if (this.registerForm.controls.confirmPassword.value == this.registerForm.controls.password.value) {
      if (password.length < 6) {
        return false;
      };

      return true;
    };
    return false;;
  }
  ValidateLanguage() {
    if (this.selectedValue != null) {
      return true;
    }
    return false;
  }

  Register() {
    this.registerSucceeded = false;
    this.registerFailed = false;
    this.errors = [];
    const user = this.registerForm.value as RegistrationUser;
    this.accountService.register(user).forEach(
      response => {
        if (response) {
          this.registerSucceeded = true;
        }
      }
    ).catch(
      error => {
        this.registerFailed = true;
        console.log("error", error);
        if (error.status == 400) {
          this.errors.push("Invalid email or password");
        } else if (error.status == 500) {
          this.errors.push("Server error");
        } else if (error.status == 0) {
          this.errors.push("Network error");
        }
        if (error.error) {
          const errorObj = JSON.parse(error.error);
          console.log("errorObj", errorObj);
          if (errorObj && errorObj.errors) {
            const errorList = errorObj.errors;
            console.log("errorList", errorList);
            for (let field in errorList) {
              let list = errorList[field] as { code: string, description: string };
              this.errors.push(`${list.description}`);
            }
          }
        }
      })
  }
}
