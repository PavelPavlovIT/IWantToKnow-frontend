import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { map, tap } from "rxjs/operators";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { Store } from "@ngrx/store";
import { Plog } from "@gpeel/plog";
import { routerNavigatedAction } from "@ngrx/router-store";

import * as fromRoot from "../../reducers";
import { LoggerService } from "../services/logger.service";

@Injectable()
export class RouterEffects {
  // updateTitle$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(routerNavigatedAction),
  //       concatLatestFrom(() => this.store.select(fromRoot.selectRouteData)),
  //       map(() => `Book Collection `),
  //       tap(() => this.titleService.setTitle(''))
  //     ),
  //   {
  //     dispatch: false,
  //   }
  // );

  constructor(
    private logger: LoggerService,
    // private store: Store,
    private actions$: Actions,
    private titleService: Title
  ) {
    // logger.Error("Error");
    // logger.Warning("Warning");
    // logger.Inforamtion("Inforamtion");
    // logger.Success("Success");
  }
}
