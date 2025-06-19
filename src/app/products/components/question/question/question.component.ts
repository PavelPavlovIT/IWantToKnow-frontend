import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryPageActions } from '../../../actions/category-page.actions';
import { Question } from '../../../models/question';
import { ListQuestionComponent } from "../list-question/list-question.component";
import * as fromQuestions from '../../../selectors/questions.selector';
import { QuestionPageActions } from '../../../actions/question-page.actions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  categopryId: string = '';
  questions$: Observable<Question[]>;


  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.params.subscribe((params) => {
      this.categopryId = params['id'] === 'undefined' ? '' : params['id'];
    });

    this.questions$ = store.select(fromQuestions.selectAllQuestions);
  }

  ngOnInit(): void {
    const categoryId = this.categopryId;
    this.store.dispatch(QuestionPageActions.loadQuestionByCategory({ categoryId }));
  }

}
