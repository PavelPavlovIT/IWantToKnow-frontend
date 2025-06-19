import { createActionGroup, props } from '@ngrx/store';

export const ProductListActions = createActionGroup({
  source: 'Product List Page',
  events: {
    'Select Category': props<{ id: string }>(),
  },
});
