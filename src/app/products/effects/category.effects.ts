import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  mergeMap,
  skip,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { CategoryPageActions } from '../actions/category-page.actions';
import { CategoriesService } from '../services/category.service';
import { Category } from '../models/category';
import { CategoryApiActions } from '../actions/category-api.actions';
import { Router } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';

@Injectable()
export class CategoryEffects {
  router = inject(Router);
  /**
   *
   */

  loadCategory$ = createEffect(
    () =>
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(CategoryPageActions.loadCategoryByParent),
          debounceTime(debounce, scheduler),
          switchMap(({ parentId }) => {
            return this.categoriesService.loadCategories(parentId).pipe(
              map((categories: Category[]) =>
                CategoryApiActions.loadSuccess({ categories })
              ),
              catchError((err) =>
                of(CategoryApiActions.loadFailure({ errorMsg: err.message }))
              )
            );
          })
        )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryPageActions.addCategory),
      mergeMap(({ category }) =>
        this.categoriesService.addCategory(category).pipe(
          map(() => {
            return CategoryApiActions.addCategorySuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CategoryApiActions.addCategoryFailure({ errorMsg: err.message })
            );
          })
        )
      )
    )
  );

  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryPageActions.removeCategory),
      mergeMap(({ category }) =>
        this.categoriesService.removeCategory(category).pipe(
          map(() => {
            location.reload();

            return CategoryApiActions.removeCategorySuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CategoryApiActions.removeCategoryFailure({
                errorMsg: err.message,
              })
            );
          })
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryPageActions.updateCategory),
      mergeMap(({ category }) =>
        this.categoriesService.updateCategory(category).pipe(
          map(() => {
            //this.router.navigate(['/products/categories']);
            return CategoryApiActions.updateCategorySuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CategoryApiActions.updateCategoryFailure({
                errorMsg: err.message,
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private logger: LoggerService,
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
