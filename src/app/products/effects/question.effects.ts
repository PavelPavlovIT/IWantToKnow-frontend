import {Injectable, inject} from '@angular/core';
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
import {CorrectAnswerPageActions} from "../actions/correct-answer-page.actions";
import {CorrectAnswerService} from "../services/correct-answer.service";
import {CorrectAnswerApiActions} from "../actions/correct-answer-api.actions";

@Injectable()
export class QuestionsEffects {
  router = inject(Router);
  /**
   *
   */

  loadQuestions$ = createEffect(
    () =>
      ({debounce = 300, scheduler = asyncScheduler} = {}) =>
        this.actions$.pipe(
          ofType(QuestionPageActions.loadQuestionByCategory),
          debounceTime(debounce, scheduler),
          switchMap(({categoryId}) => {
            return this.questionService.loadQuestions(categoryId).pipe(
              map((questions: Question[]) =>
                QuestionApiActions.loadSuccess({questions})
              ),
              catchError((err) =>
                of(QuestionApiActions.loadFailure({errorMsg: err.message}))
              )
            );
          })
        )
  );

  addQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionPageActions.addQuestion),
      mergeMap(({question}) =>
        this.questionService.addQuestion(question).pipe(
          map(() => {
            return QuestionApiActions.addQuestionSuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              QuestionApiActions.addQuestionFailure({errorMsg: err.message})
            );
          })
        )
      )
    )
  );

  removeQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionPageActions.removeQuestion),
      mergeMap(({question}) =>
        this.questionService.removeQuestion(question).pipe(
          map(() => {
            location.reload();

            return QuestionApiActions.removeQuestionSuccess();
          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              QuestionApiActions.removeQuestionFailure({
                errorMsg: err.message,
              })
            );
          })
        )
      )
    )
  );

  updateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionPageActions.updateQuestion),
      mergeMap(({question}) =>
        this.questionService.updateQuestion(question).pipe(
          map((response) => {
            if (response.success) {
              return QuestionApiActions.updateQuestionSuccess();
            } else {
              return QuestionApiActions.updateQuestionFailure({
                errorMsg: response.message,
              });
            }

          }),
          catchError((err) => {
            this.router.navigate(['/404']);
            return of(
              QuestionApiActions.updateQuestionFailure({
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
    private questionService: QuestionService,
    private correctAnswerService: CorrectAnswerService,
  ) {
  }
}
