import { configureStore } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import currency from './currencySlice';

export const store = configureStore({
   reducer: {
      categories,
      currency
   }
});
