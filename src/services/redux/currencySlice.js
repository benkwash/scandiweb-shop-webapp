import { createSlice } from '@reduxjs/toolkit';

const currency = '';

export const currencySlice = createSlice({
   name: 'currency',
   initialState: currency,
   reducers: {
      setCurrency: (state, { payload }) => payload
   }
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
