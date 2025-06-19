import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../models/product';

export const ProductApiActions = createActionGroup({
  source: 'Products/API',
  events: {
    'Load Success': props<{ products: Product[] }>(),
    'Load Failure': props<{ errorMsg: string }>(),
  },
});
