 import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CategoryApiActions } from '../actions/category-api.actions';
import { CategoryPageActions } from '../actions/category-page.actions';
import { Category } from '../models/category';

export const categoriesFeatureKey = 'categories';

export interface State extends EntityState<Category> {
  selectedCategoryId: string | null;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (category: Category) => category.categoryId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedCategoryId: null,
});

export const reducer = createReducer(
  initialState,
  on(CategoryPageActions.selectCategory,
    (state, { id }) => ({
    ...state,
    selectedCategoryId: id
  })),

  on(CategoryApiActions.loadSuccess, (state, { categories }) =>
    adapter.addMany(categories, state)
  ),

  on(CategoryApiActions.loadFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getCategories = (state: State) => state.entities;
export const selectId = (state: State) => state.selectedCategoryId;

