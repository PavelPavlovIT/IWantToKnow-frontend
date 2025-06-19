import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product';
import { Category } from '../models/category';
import {NextQuestion} from "../models/next-question";
import {StartTest} from "../models/start-test";

export const TestApiActions = createActionGroup({
  source: 'Test/API',
  events: {
    'Load Success': props<{ startTest: StartTest }>(),
    'Load Failure': props<{ errorMsg: string }>(),

    'Add Category Success': emptyProps(),
    'Add Category Failure': props<{ errorMsg: string }>(),

    'Remove Category Success': emptyProps(),
    'Remove Category Failure': props<{ errorMsg: string }>(),

    'Update Category Success': emptyProps(),
    'Update Category Failure': props<{ errorMsg: string }>(),
  },
});
