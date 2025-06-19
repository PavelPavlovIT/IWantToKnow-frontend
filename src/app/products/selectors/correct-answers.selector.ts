import {createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromCorrectAnswers from '../reducers/correct-answers.reducer';
import {selectProductsState} from './products.selector';
import {rootFeatureKey, RootState} from "../reducers";

export const correctAnswersFeatureKey = 'correctAnswers';

export const selectCorrectAnswersState =
  createFeatureSelector<RootState>(rootFeatureKey);

export const selectCorrectAnswerEntitiesState = createSelector(
  selectProductsState,
  (state) => state.correctAnswers
);

export const selectSelectedCorrectAnswerId = createSelector(
  selectCorrectAnswerEntitiesState,
  fromCorrectAnswers.selectId
);

export const {
  selectIds: selectCorrectAnswerIds,
  selectEntities: selectCorrectAnswerEntities,
  selectAll: selectAllCorrectAnswers,
  selectTotal: selectTotalCorrectAnswers,
} = fromCorrectAnswers.adapter.getSelectors(selectCorrectAnswerEntitiesState);

export const selectSelectedCorrectAnswer = createSelector(
  selectCorrectAnswerEntities,
  selectSelectedCorrectAnswerId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectCorrectAnswerState = createSelector(
  selectCorrectAnswersState,
  (state) => state.correctAnswers
);

export const selectCorrectAnswerGetError = createSelector(
  selectCorrectAnswerState,
  fromCorrectAnswers.getError
);
