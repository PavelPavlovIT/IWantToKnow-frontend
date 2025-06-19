import { createActionGroup, props } from '@ngrx/store';

export const ViewCategoryPageActions = createActionGroup({
  source: 'View Category Page',
  events: {
    'Select Category': props<{ id: string }>(),
  },
});
