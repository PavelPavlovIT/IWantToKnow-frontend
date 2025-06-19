import { createReducer, on } from '@ngrx/store';
import { AccountApiActions } from '../actions/account-api.actions';
import { AccountActions } from '../actions/account.actions';
import { User } from '../models';
import { Account } from '../models/account';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
  account: Account | null;
}

export const initialState: State = {
  user: null,
  account: null
};

export const reducer = createReducer(
  initialState,
  // on(AccountApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  // on(AccountApiActions.checkAuthenticatedSuccess, (state, { account }) => ({ ...state, account })),
  on(AccountActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
export const getAccount = (state: State) => state.account;
