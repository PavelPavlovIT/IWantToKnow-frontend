import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromCategories from "./categories.reducer";
import * as fromCategoriesHierarchy from "./categories-hearachy.reducer";
import * as fromQuestions from "./questions.reducer";
import * as fromCorrectAnswers from "./correct-answers.reducer";
import * as fromProducts from "./products.reducer";
import * as fromRoot from '../../reducers';
import * as fromTypeTests from './type-test.reducer';

export const rootFeatureKey = "root";

export interface RootState {
  [fromCategoriesHierarchy.categoriesHierarchyFeatureKey]: fromCategoriesHierarchy.State;
  [fromCategories.categoriesFeatureKey]: fromCategories.State;
  [fromQuestions.questionsFeatureKey]: fromQuestions.State;
  [fromCorrectAnswers.correctAnswersFeatureKey]: fromCorrectAnswers.State;
  [fromTypeTests.typeTestsFeatureKey]: fromTypeTests.State;
}

export interface State extends fromRoot.State {
  [rootFeatureKey]: RootState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: RootState | undefined, action: Action) {
  return combineReducers({
    [fromCategoriesHierarchy.categoriesHierarchyFeatureKey]: fromCategoriesHierarchy.reducer,
    [fromCategories.categoriesFeatureKey]: fromCategories.reducer,
    [fromQuestions.questionsFeatureKey]: fromQuestions.reducer,
    [fromCorrectAnswers.correctAnswersFeatureKey]: fromCorrectAnswers.reducer,
    [fromTypeTests.typeTestsFeatureKey]: fromTypeTests.reducer,
  })(state, action);
}
