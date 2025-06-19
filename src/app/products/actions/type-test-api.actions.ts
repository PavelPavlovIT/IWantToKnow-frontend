import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product';
import { Category } from '../models/category';
import {TypeTest} from "../models/type-test";
import {Test} from "../models/test";

export const TypeTestApiActions = createActionGroup({
  source: 'TypeTest/API',
  events: {
    'Load type test success': props<{ typeOfTests: TypeTest[] }>(),
    'Load type test failure': props<{ errorMsg: string }>(),
  },
});
