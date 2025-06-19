import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../models/category';

export const CategoryPageActions = createActionGroup({
  source: 'Category Page',
  events: {
    'Load Category Hierarchy': props<{ categoryId: string }>(),
    'Load Category By Parent': props<{ parentId: string }>(),
    'Add Category': props<{ category: Category }>(),
    'Remove Category': props<{ category: Category }>(),
    'Update Category': props<{ category: Category }>(),
    'Select Category': props<{ id: string }>(),
  },
});
