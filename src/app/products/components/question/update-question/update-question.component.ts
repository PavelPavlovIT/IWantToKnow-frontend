import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UpdateQuestionContainerComponent} from './update-question-container.component';
import {BaseComponent} from '../../../../core/components/base/base.component';
import {Subscription, map, Observable} from 'rxjs';
import {CategoryPageActions} from '../../../actions/category-page.actions';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {LoggerService} from '../../../../core/services/logger.service';
import {QuestionPageActions} from '../../../actions/question-page.actions';
import {Question} from "../../../models/question";
import * as fromCorrectAnswers from "../../../selectors/correct-answers.selector";
import {CorrectAnswer} from "../../../models/correct-answer";
import {AsyncPipe, DOCUMENT} from "@angular/common";
import {CorrectAnswerPageActions} from "../../../actions/correct-answer-page.actions";

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [UpdateQuestionContainerComponent, AsyncPipe],
  template: `
    <app-update-question-container
      [questionId]="this.questionId!"></app-update-question-container>`,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateQuestionComponent implements OnDestroy, OnInit {
  actionsSubscription: Subscription;
  questionId: string = '';

  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService, private store: Store, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.questionId = params['id'] === 'undefined' ? '' : params['id'];
    });

    this.actionsSubscription = route.params
      .pipe(
        map((params) =>
          QuestionPageActions.selectQuestion({id: params['id']})
        )
      )
      .subscribe((action) => store.dispatch(action));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'] === 'undefined' ? '' : params['id'];
    });

    this.actionsSubscription = this.route.params
      .pipe(
        map((params) =>
          QuestionPageActions.selectQuestion({id: params['id']})
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
