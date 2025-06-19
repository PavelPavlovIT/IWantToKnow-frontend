import { AccountApiActions } from '../actions/account-api.actions';
import { AccountActions } from '../actions/account.actions';
import { createReducer, on } from '@ngrx/store';

export const loginPageFeatureKey = 'loginPage';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

// export const reducer = createReducer(
//   initialState,
//   on(AccountActions.login, (state) => ({
//     ...state,
//     error: null,
//     pending: true,
//   })),
  // on(AccountApiActions.loginSuccess, (state) => ({
  //   ...state,
  //   error: null,
  //   pending: false,
  // })),
  // on(AccountApiActions.loginFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  //   pending: false,
  // })),

  // on(AccountActions.checkAuthenticated, (state) => ({
  //   ...state,
  //   error: null,
  //   pending: true,
  // })),
//   on(AccountApiActions.checkAuthenticatedSuccess, (state) => ({
//     ...state,
//     error: null,
//     pending: false,
//   })),
//   on(AccountApiActions.checkAuthenticatedFailure, (state, { error }) => ({
//     ...state,
//     error,
//     pending: false,
//   }))
// );

// export const getError = (state: State) => state.error;
// export const getPending = (state: State) => state.pending;
