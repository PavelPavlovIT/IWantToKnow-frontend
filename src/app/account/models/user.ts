import { FormControl } from "@angular/forms";

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  email: string;
  password: string;
  language: string;
}

export interface UserInfo {
  id: string;
  email: string;
  language: string;
  expireDateTime:string;
  expired:boolean;
}
export interface RegistrationUser{
  email: string;
  password: string;
  confirmPassword: string;
  language: string;
}

export interface ForgotPassword{
  email: string;
}
export interface ResetPassword{
  userId: string;
  token:string;
  newPassword:string;
  confirmPassword: string;
}

export type ResetPasswordForm = {
  [field in keyof ResetPassword]: FormControl<ResetPassword[field] | null>;
};
export type ForgotPasswordForm = {
  [field in keyof ForgotPassword]: FormControl<ForgotPassword[field] | null>;
};

export type RegistrationUserForm = {
  [field in keyof RegistrationUser]: FormControl<RegistrationUser[field] | null>;
};
export type UserForm = {
  [field in keyof User]: FormControl<User[field] | null>;
};
