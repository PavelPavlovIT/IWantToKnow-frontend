import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../models/category';

export const TypeTestPageActions = createActionGroup({
  source: 'Type Test Page',
  events: {
    'Load types of tests': emptyProps(),
    'Select type test': props<{ id: string }>(),
  },
});
