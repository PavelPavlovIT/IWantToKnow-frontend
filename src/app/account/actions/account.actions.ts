import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Credentials } from "../models";

export const AccountActions = createActionGroup({
  source: "Auth",
  events: {
    Logout: emptyProps(),
    "Logout Confirmation": emptyProps(),
    "Logout Confirmation Dismiss": emptyProps(),
    "Check Authenticated": emptyProps(),
    Login: props<{ credentials: Credentials }>(),
  },
});
