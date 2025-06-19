import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { User } from '../models';
import { Account } from '../models/account';

export const AccountApiActions = createActionGroup({
  source: 'Auth/API',
  events: {
    // 'Login Success': props<{ user: User }>(),
    // 'Login Failure': props<{ error: any }>(),
    // 'Login Redirect': emptyProps(),
    // 'Check Authenticated Success': props<{ account: Account }>(),
    // 'Check Authenticated Failure': props<{ error: any }>(),
  },
});
