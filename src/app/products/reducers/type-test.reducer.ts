import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CategoryApiActions } from '../actions/category-api.actions';
import { CategoryPageActions } from '../actions/category-page.actions';
import { Category } from '../models/category';
import {Test} from "../models/test";
import {TestPageActions} from "../actions/test-page.actions";
import {TestApiActions} from "../actions/test-api.actions";
import {TypeTest} from "../models/type-test";
import {TypeTestPageActions} from "../actions/type-test-page.actions";
import {TypeTestApiActions} from "../actions/type-test-api.actions";

export const typeTestsFeatureKey = 'typeOfTests';

export interface State extends EntityState<TypeTest> {
  selectedTypeTestId: string | null;
}

export const adapter: EntityAdapter<TypeTest> = createEntityAdapter<TypeTest>({
  selectId: (typeTest: TypeTest) => typeTest.typeTestId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedTypeTestId: null,
});

export const reducer = createReducer(
  initialState,
  on(TypeTestPageActions.selectTypeTest,
    (state, { id }) => ({
    ...state,
    selectedTypeTestId: id
  })),

  on(TypeTestApiActions.loadTypeTestSuccess, (state, { typeOfTests }) =>
    adapter.addMany(typeOfTests, state)
  ),

  on(TypeTestApiActions.loadTypeTestFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getTypeTests = (state: State) => state.entities;
export const selectId = (state: State) => state.selectedTypeTestId;

