import {createFeatureSelector, createSelector,} from '@ngrx/store';
import {rootFeatureKey, RootState} from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';
import * as fromCategoriesHirarchy from '../reducers/categories-hearachy.reducer';
import {selectProductsState} from './products.selector';

export const categoriesFeatureKey = 'products';

export const selectCategoriesState =
  createFeatureSelector<RootState>(rootFeatureKey);

export const selectCategoryEntitiesState = createSelector(
  selectProductsState,
  (state) => state.categories
);

export const selectCategoryHierarchyEntitiesState = createSelector(
  selectProductsState,
  (state) => state['categories-hierarchy']
);

export const selectSelectedCategoryId = createSelector(
  selectCategoryEntitiesState,
  fromCategories.selectId
);

export const {
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: selectTotalCategories,
} = fromCategories.adapter.getSelectors(selectCategoryEntitiesState);

export const {
  selectAll: selectCategoriesHierarchy,
} = fromCategoriesHirarchy.adapter.getSelectors(selectCategoryHierarchyEntitiesState);

export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  selectSelectedCategoryId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectCategoryState = createSelector(
  selectCategoriesState,
  (state) => state.categories
);

export const selectCategoryGetCategories = createSelector(
  selectCategoryState,
  fromCategories.getCategories
);
