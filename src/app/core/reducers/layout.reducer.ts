import { createReducer, on } from '@ngrx/store';
import {LayoutActions} from "../actions/layout.actions";
import {AccountActions} from "../../account/actions/account.actions";


export const layoutFeatureKey = 'layout';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.closeSidenav, () => ({ showSidenav: false })),
  on(LayoutActions.openSidenav, () => ({ showSidenav: true })),
  on(AccountActions.logoutConfirmation, () => ({ showSidenav: false }))
);

export const selectShowSidenav = (state: State) => state.showSidenav;
