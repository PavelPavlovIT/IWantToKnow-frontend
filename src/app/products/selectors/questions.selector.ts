import {createFeatureSelector, createSelector,} from '@ngrx/store';
import {rootFeatureKey, RootState} from '../reducers';
import * as fromQuestions from '../reducers/questions.reducer';
import {selectProductsState} from './products.selector';

export const questionsFeatureKey = 'questions';

export const selectQuestionsState =
  createFeatureSelector<RootState>(rootFeatureKey);

export const selectQuestionEntitiesState = createSelector(
  selectProductsState,
  (state) => state.questions
);

export const selectSelectedQuestionId = createSelector(
  selectQuestionEntitiesState,
  fromQuestions.selectId
);

export const {
  selectIds: selectQuestionIds,
  selectEntities: selectQuestionEntities,
  selectAll: selectAllQuestions,
  selectTotal: selectTotalQuestions,
} = fromQuestions.adapter.getSelectors(selectQuestionEntitiesState);

export const selectSelectedQuestion = createSelector(
  selectQuestionEntities,
  selectSelectedQuestionId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);


export const selectQuestionState = createSelector(
  selectQuestionsState,
  (state) => state.questions
);

export const selectQuestionGetError = createSelector(
  selectQuestionState,
  fromQuestions.getError
);
