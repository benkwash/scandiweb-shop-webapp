import { configureStore } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import currency from './currencySlice';
import cart from './cartSlice';

export const store = configureStore({
   reducer: {
      categories,
      currency,
      cart
   }
});
