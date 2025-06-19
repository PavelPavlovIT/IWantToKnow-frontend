import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CategoryApiActions} from '../actions/category-api.actions';
import {CategoryPageActions} from '../actions/category-page.actions';
import {Category} from '../models/category';
import {Question} from '../models/question';
import {QuestionPageActions} from '../actions/question-page.actions';
import {QuestionApiActions} from '../actions/question-api.actions';
import {CorrectAnswer} from "../models/correct-answer";
import {CorrectAnswerApiActions} from "../actions/correct-answer-api.actions";

export const questionsFeatureKey = 'questions';

export interface State extends EntityState<Question> {
  selectedQuestionId: string | null;
  error: string | null;
}

export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  selectId: (question: Question) => question.questionId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedQuestionId: null,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(QuestionPageActions.selectQuestion,
    (state, {id}) => ({
      ...state,
      selectedQuestionId: id,
    })),

  on(QuestionApiActions.loadSuccess, (state, {questions}) =>
    adapter.addMany(questions, state)
  ),

  on(QuestionApiActions.loadFailure, (state, {errorMsg}) => ({
    ...state,
    loading: false,
    error: errorMsg,
  })),

  on(QuestionApiActions.updateQuestionFailure, (state, {errorMsg}) =>
    ({
      ...state,
      error: errorMsg,
    })
  ),
);

export const getQuestions = (state: State) => state.entities;
export const selectId = (state: State) => state.selectedQuestionId;
export const getError = (state: State) => state.error;

