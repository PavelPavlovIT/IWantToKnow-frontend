import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CategoryApiActions} from '../actions/category-api.actions';
import {CategoryPageActions} from '../actions/category-page.actions';
import {Category} from '../models/category';
import {Question} from '../models/question';
import {QuestionPageActions} from '../actions/question-page.actions';
import {QuestionApiActions} from '../actions/question-api.actions';
import {CorrectAnswer} from "../models/correct-answer";
import {CorrectAnswerPageActions} from "../actions/correct-answer-page.actions";
import {CorrectAnswerApiActions} from "../actions/correct-answer-api.actions";
import {SelectedCorrectAnswerPageActions} from "../actions/selected-correct-answer-page.actions";

export const correctAnswersFeatureKey = 'correctAnswers';

export interface State extends EntityState<CorrectAnswer> {
  selectedCorrectAnswerId: string | null;
  ids: string[];
  error: string | null;
}

export const adapter: EntityAdapter<CorrectAnswer> = createEntityAdapter<CorrectAnswer>({
  selectId: (correctAnswer: CorrectAnswer) => correctAnswer.correctAnswerId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedCorrectAnswerId: null,
  ids: [],
  error: null
});

export const reducer = createReducer(
  initialState,
  on(CorrectAnswerPageActions.selectCorrectAnswer,
    (state, {id}) => ({
      ...state,
      selectedCorrectAnswerId: id,
    })),

  on(CorrectAnswerApiActions.loadCorrectAnswersSuccess, (state, {correctAnswers}) =>
    adapter.addMany(correctAnswers, state)
  ),

  on(
    CorrectAnswerApiActions.removeCorrectAnswerSuccess,
    // CorrectAnswerApiActions.addCorrectAnswerFailure,
    (state, {correctAnswer}) =>
      adapter.removeOne(correctAnswer.correctAnswerId, state)
  ),

  on(
    CorrectAnswerApiActions.updateCorrectAnswerSuccess,
    // CorrectAnswerApiActions.addCorrectAnswerFailure,
    (state, {correctAnswer}) =>
      adapter.updateOne({
        id: correctAnswer.correctAnswerId,
        changes: correctAnswer
      }, state)
  ),

  on(CorrectAnswerApiActions.loadCorrectAnswersFailure, (state, {errorMsg}) => ({
    ...state,
    loading: false,
    error: errorMsg,
  })),

  on(CorrectAnswerApiActions.updateCorrectAnswerFailure, (state, {errorMsg}) => ({
    ...state,
    loading: false,
    error: errorMsg,
  })),
  on(CorrectAnswerApiActions.addCorrectAnswerFailure, (state, {errorMsg}) => ({
    ...state,
    loading: false,
    error: errorMsg,
  })),
  on(CorrectAnswerApiActions.removeCorrectAnswerFailure, (state, {errorMsg}) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getCorrectAnswers = (state: State) => state.entities;
export const selectId = (state: State) => state.selectedCorrectAnswerId;
export const getIds = (state: State) => state.ids;
export const getError = (state: State) => state.error;
