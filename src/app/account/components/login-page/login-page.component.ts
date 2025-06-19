import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Credentials, User, UserForm } from "../../models";
import { environment } from "../../../environments/environment";
import { AccountService } from "../../services";
import { DOCUMENT } from "@angular/common";
import { Language } from "../../models/language";
import { ActivatedRoute, Router } from "@angular/router";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {

  @Input() errorMessage!: string | null;

  @Output() submitted = new EventEmitter<Credentials>();

  loginForm = new FormGroup<UserForm>({
    email: new FormControl(""),
    password: new FormControl(""),
    language: new FormControl("en")
  });

  languages: Language[] = [
    { value: 'en', viewValue: 'En' },
    { value: 'es', viewValue: 'Es' },
    { value: 'ru', viewValue: 'Ru' },
  ];

  selectedValue = this.languages[0].value;
  authFailed: boolean = false;
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private accountService: AccountService) {

    }

  Register() {
    this.document.location.href = `register`;
  }
  Forgot() {
    this.document.location.href = `forgot`;
  }


  Login() {
    this.authFailed = false;
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.accountService.signIn(email, password).forEach(
      response => {
        if (response) {
          this.router.navigateByUrl("products/categories");
        }
      }).catch(
        _ => {
          this.authFailed = true;
        });

  }


}
