import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {UpdateQuestionDetailComponent} from './update-question-detail.component';
import {Observable} from 'rxjs';
import {Question} from '../../../models/question';
import {CorrectAnswer} from '../../../models/correct-answer';
import * as fromQuestions from '../../../selectors/questions.selector';
import {Store} from '@ngrx/store';
import {QuestionPageActions} from '../../../actions/question-page.actions';
import {CommonModule} from '@angular/common';
import * as fromCorrectAnswers from "../../../selectors/correct-answers.selector";
import {ListQuestionComponent} from "../list-question/list-question.component";
import {CorrectAnswerPageActions} from "../../../actions/correct-answer-page.actions";

@Component({
  selector: 'app-update-question-container',
  standalone: true,
  imports: [CommonModule, UpdateQuestionDetailComponent, ListQuestionComponent],
  template: `
    <app-update-question-detail
      [error]="(error$ | async)!"
      [correctAnswers]="(correctAnswers$ | async)!"
      [question]="(question$ | async)!"
      (update)="updateQuestion($event)"
    ></app-update-question-detail>`,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateQuestionContainerComponent {
  question$: Observable<Question>;
  correctAnswers$: Observable<CorrectAnswer[]>;
  error$: Observable<string | null>;
  @Input() questionId!: string;
  // @Output() reloadByQuestion = new EventEmitter<string>();
  /**
   *
   */
  constructor(private store: Store) {
    this.question$ = store.select(
      fromQuestions.selectSelectedQuestion
    ) as Observable<Question>;

    this.correctAnswers$ = store.select(fromCorrectAnswers.selectAllCorrectAnswers);
    this.error$ = store.select(fromQuestions.selectQuestionGetError);
  }

  ngOnInit(): void {
    const questionId = this.questionId;
    this.store.dispatch(CorrectAnswerPageActions.loadCorrectAnswersByQuestion({questionId}));
  }


  updateQuestion(question: Question) {
    this.store.dispatch(QuestionPageActions.updateQuestion({question}));
  }

}
