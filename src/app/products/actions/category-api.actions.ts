import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product';
import { Category } from '../models/category';

export const CategoryApiActions = createActionGroup({
  source: 'Category/API',
  events: {
    'Load Hierarchy Success': props<{ categories: Category[] }>(),
    'Load Hierarchy Failure': props<{ errorMsg: string }>(),

    'Load Success': props<{ categories: Category[] }>(),
    'Load Failure': props<{ errorMsg: string }>(),

    'Add Category Success': emptyProps(),
    'Add Category Failure': props<{ errorMsg: string }>(),

    'Remove Category Success': emptyProps(),
    'Remove Category Failure': props<{ errorMsg: string }>(),

    'Update Category Success': emptyProps(),
    'Update Category Failure': props<{ errorMsg: string }>(),
  },
});
