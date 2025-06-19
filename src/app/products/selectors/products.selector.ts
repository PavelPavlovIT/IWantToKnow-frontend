import {createFeatureSelector, createSelector,} from "@ngrx/store";
import {rootFeatureKey, RootState} from "../reducers";
import {categoriesFeatureKey} from "../reducers/categories.reducer";


export const selectProductsState =
  createFeatureSelector<RootState>(rootFeatureKey);

export const selectProductEntitiesState = createSelector(
  selectProductsState,
  (state) => state[categoriesFeatureKey]
);

export const selectCategoryState = createSelector(
  selectProductsState,
  (state) => state.categories
);

