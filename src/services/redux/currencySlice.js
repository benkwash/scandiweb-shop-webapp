import { createSlice } from '@reduxjs/toolkit';

const currency = localStorage.getItem('scandiweb-selected-currency') || '';

export const currencySlice = createSlice({
   name: 'currency',
   initialState: currency,
   reducers: {
      setCurrency: (state, { payload }) => {
         localStorage.setItem('scandiweb-selected-currency', payload);
         return payload;
      }
   }
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
