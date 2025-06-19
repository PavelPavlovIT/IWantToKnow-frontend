import {Injectable, inject, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {createEffect, ofType, Actions} from '@ngrx/effects';
import {
  asyncScheduler,
  debounceTime,
  switchMap,
  map,
  catchError,
  of,
  mergeMap,
} from 'rxjs';
import {LoggerService} from '../../core/services/logger.service';
import {CategoryApiActions} from '../actions/category-api.actions';
import {CategoryPageActions} from '../actions/category-page.actions';
import {Category} from '../models/category';
import {QuestionPageActions} from '../actions/question-page.actions';
import {QuestionService} from '../services/question.service';
import {Question} from '../models/question';
import {QuestionApiActions} from '../actions/question-api.actions';
import {CorrectAnswer} from "../models/correct-answer";
import {CorrectAnswerService} from "../services/correct-answer.service";
import {CorrectAnswerPageActions} from "../actions/correct-answer-page.actions";
import {CorrectAnswerApiActions} from "../actions/correct-answer-api.actions";
import {DOCUMENT} from "@angular/common";
import {SelectedCorrectAnswerPageActions} from "../actions/selected-correct-answer-page.actions";
import {Store} from "@ngrx/store";

@Injectable()
export class CorrectAnswersEffects {
  router = inject(Router);
  /**
   *
   */

  loadCorrectAnswers$ = createEffect(
    () =>
      ({debounce = 300, scheduler = asyncScheduler} = {}) =>
        this.actions$.pipe(
          ofType(CorrectAnswerPageActions.loadCorrectAnswersByQuestion),
          debounceTime(debounce, scheduler),
          switchMap(({questionId}) => {
            return this.correctAnswerService.loadCorrectAnswers(questionId).pipe(
              map((correctAnswers: CorrectAnswer[]) =>
                CorrectAnswerApiActions.loadCorrectAnswersSuccess({correctAnswers})
              ),
              catchError((err) =>
                of(CorrectAnswerApiActions.loadCorrectAnswersFailure({errorMsg: err.message}))
              )
            );
          })
        )
  );

  loadCorrectAnswersByCategoryId$ = createEffect(
    () =>
      ({debounce = 300, scheduler = asyncScheduler} = {}) =>
        this.actions$.pipe(
          ofType(CorrectAnswerPageActions.loadCorrectAnswersByCategory),
          debounceTime(debounce, scheduler),
          switchMap(({categoryId}) => {
            return this.correctAnswerService.loadCorrectAnswersByCategoryId(categoryId).pipe(
              map((correctAnswers: CorrectAnswer[]) =>
                CorrectAnswerApiActions.loadCorrectAnswersByCategorySuccess({correctAnswers})
              ),
              catchError((err) =>
                of(CorrectAnswerApiActions.loadCorrectAnswersByCategoryFailure({errorMsg: err.message}))
              )
            );
          })
        )
  );

  addBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedCorrectAnswerPageActions.addCorrectAnswer),
      mergeMap(({correctAnswer}) =>
        this.correctAnswerService.addCorrectAnswer(correctAnswer).pipe(
          map(() => {
            return CorrectAnswerApiActions.addCorrectAnswerSuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CorrectAnswerApiActions.addCorrectAnswerFailure({errorMsg: err.message})
            );
          })
        )
      )
    )
  );


  addCorrectAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CorrectAnswerPageActions.addCorrectAnswer),
      mergeMap(({correctAnswer}) =>
        this.correctAnswerService.addCorrectAnswer(correctAnswer).pipe(
          map(() => {
            return CorrectAnswerApiActions.addCorrectAnswerSuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CorrectAnswerApiActions.addCorrectAnswerFailure({errorMsg: err.message})
            );
          })
        )
      )
    )
  );

  removeCorrectAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CorrectAnswerPageActions.removeCorrectAnswer),
      mergeMap(({correctAnswer}) =>
        this.correctAnswerService.removeCorrectAnswer(correctAnswer).pipe(
          map(() => {
            return CorrectAnswerApiActions.removeCorrectAnswerSuccess({correctAnswer});
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CorrectAnswerApiActions.removeCorrectAnswerFailure({
                errorMsg: err.message,
              })
            );
          })
        )
      )
    )
  );

  updateCorrectAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CorrectAnswerPageActions.updateCorrectAnswer),
      mergeMap(({correctAnswer}) =>
        this.correctAnswerService.updateCorrectAnswer(correctAnswer).pipe(
          map(() => {
            return CorrectAnswerApiActions.updateCorrectAnswerSuccess({correctAnswer});
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              CorrectAnswerApiActions.updateCorrectAnswerFailure({
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
    private correctAnswerService: CorrectAnswerService,
    @Inject(DOCUMENT) private document: Document,
    private store: Store
  ) {
  }
}
