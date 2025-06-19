import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductPageActions = createActionGroup({
  source: 'Product Page',
  events: {
    'Load Product': props<{ id: string }>(),
  },
});
