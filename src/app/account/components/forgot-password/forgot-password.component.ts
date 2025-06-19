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

@Component({
  selector: 'app-forgot-password',
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
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  languages: Language[] = [
    { value: 'en', viewValue: 'En' },
    { value: 'es', viewValue: 'Es' },
    { value: 'ru', viewValue: 'Ru' },
  ];
  selectedValue = this.languages[0].value;

  forgotPasswordForm = new FormGroup<ForgotPasswordForm>({
    email: new FormControl(""),
  });

  errors: string[] = [];

  forgotPasswordSucceeded: boolean = false;
  forgotPasswordFailed: boolean = false;

  signedIn: boolean = false;
  type: string = "";
  userId: string = "";
  token: string = "";


  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.selectedValue = this.languages[0].value;
  }

  ngAfterViewInit() {
    this.route.params.subscribe((params) => {
      this.type = params['type'] === 'undefined' ? '' : params['type'];
      this.userId = params['userId'] === 'undefined' ? '' : params['userId'];
      this.token = params['token'] === 'undefined' ? '' : params['token'];
    });

  }

  ValidateEmail(): boolean {
    if (this.forgotPasswordForm.controls.email.valid) return true;
    return false;
  }

  ForgotPassword() {
    this.errors = [];
    this.forgotPasswordFailed = false;
    this.forgotPasswordSucceeded = false;
    const model = this.forgotPasswordForm.value as ForgotPassword;
    this.accountService.forgotPassword(model).forEach(
      response => {
        if (response) {
          this.forgotPasswordSucceeded = true;
        }
      }
    ).catch(
      error => {
        this.forgotPasswordFailed = true;
        this.errors.push(`${error.error}`);
      })

  }
}
