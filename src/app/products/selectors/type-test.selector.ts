import {createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromTypeTest from '../reducers/type-test.reducer';
import {selectProductsState} from './products.selector';
import {rootFeatureKey, RootState} from "../reducers";

export const typeTestFeatureKey = 'typesOfTests';

export const selectTypeTestState =
  createFeatureSelector<RootState>(rootFeatureKey);

export const selectTypeTestEntitiesState = createSelector(
  selectProductsState,
  (state) => state.typeOfTests
);

export const selectSelectedTypeTestId = createSelector(
  selectTypeTestEntitiesState,
  fromTypeTest.selectId
);

export const {
  selectIds: selectCorrectAnswerIds,
  selectEntities: selectTypeTestEntities,
  selectAll: selectAllTypeTests,
  selectTotal: selectTotalTypeTests,
} = fromTypeTest.adapter.getSelectors(selectTypeTestEntitiesState);

export const selectSelectedCorrectAnswer = createSelector(
  selectTypeTestEntities,
  selectSelectedTypeTestId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectCorrectAnswerState = createSelector(
  selectTypeTestState,
  (state) => state.typeOfTests
);

