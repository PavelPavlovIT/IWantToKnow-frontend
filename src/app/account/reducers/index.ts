import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './account.reducer';
import * as fromLoginPage from '../../account/reducers/login-page.reducer';

export const authFeatureKey = 'account';

export interface AccountState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AccountState;
}

// export function reducers(state: AccountState | undefined, action: Action) {
//   return combineReducers({
//     [fromAuth.statusFeatureKey]: fromAuth.reducer,
//     [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
//   })(state, action);
// }

export const selectAuthState = createFeatureSelector<AccountState>(authFeatureKey);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state.status
);
export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
export const selectAccount = createSelector(
  selectAuthStatusState,
  fromAuth.getAccount
);

export const selectLoggedIn = createSelector(selectUser, (user) => !!user);
export const selectAuthenticated = createSelector(selectUser, (account) => !!account);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state) => state.loginPage
);
// export const selectLoginPageError = createSelector(
//   selectLoginPageState,
//   fromLoginPage.getError
// );
// export const selectLoginPagePending = createSelector(
//   selectLoginPageState,
//   // fromLoginPage.getPending
// );
