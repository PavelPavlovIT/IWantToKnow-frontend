import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../models/category';
import {NextQuestion} from "../models/next-question";

export const TestPageActions = createActionGroup({
  source: 'Test Page',
  events: {
    'Start Test': props<{ categoryId: string, typeTestId: string, countQuestion: number, nextQuestion: NextQuestion | null | undefined }>(),
    'Load Category By Parent': props<{ parentId: string }>(),
    'Add Category': props<{ category: Category }>(),
    'Remove Category': props<{ category: Category }>(),
    'Update Category': props<{ category: Category }>(),
    'Select Category': props<{ id: string }>(),
  },
});
