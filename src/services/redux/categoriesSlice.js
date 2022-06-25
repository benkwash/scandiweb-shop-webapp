import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   categories: [],
   selectedCategory: 'all'
};

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   reducers: {
      setCategories: (state, { payload }) => {
         state.categories = payload;
      },
      setSelectedCategory: (state, { payload }) => {
         state.selectedCategory = payload;
      }
   }
});

export const { setCategories, setSelectedCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
