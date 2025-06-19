import { createReducer, on } from '@ngrx/store';
import { CategoryApiActions } from '../actions/category-api.actions';
import { ProductPageActions } from '../actions/product-page.actions';
import { ProductApiActions } from '../actions/product-api.actions';

export const productsFeatureKey = "products";

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: "",
};

export const reducer = createReducer(
  initialState,
  on(ProductPageActions.loadProduct, (state) => {
    return {
      ...state,
      loading: true,
      error: "",
    };
  }),
  on(ProductApiActions.loadSuccess, (state, { products }) => ({
    ids: products.map((product) => product.categoryId),
    loading: false,
    error: ""
  })),
  on(CategoryApiActions.loadFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getIds = (state: State) => state.ids;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
