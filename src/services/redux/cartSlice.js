import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

const initialState =
   JSON.parse(localStorage.getItem('scandiweb-cart-list')) || [];
// cart[
// {
//    quantity:number,
//    productDetails:{
//       id:
//       attributes:[],
//       prices:[]
//       etc
//    }
// }
// ]

const updateCartLocalStorage = (cart) => {
   localStorage.setItem('scandiweb-cart-list', JSON.stringify(cart));
};

const removeCartLocalStorage = () => {
   localStorage.removeItem('scandiweb-cart-list');
};
export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addProductToCart: (state, { payload }) => {
         let isProductInCart = false;
         for (const index in state) {
            if (isEqual(payload, state[index].productDetails)) {
               state[index].quantity += 1;
               isProductInCart = true;
               break;
            }
         }
         if (!isProductInCart)
            state.push({
               quantity: 1,
               productDetails: payload
            });
         updateCartLocalStorage(state);
         return state;
      },
      updateProduct: (state, { payload: { cartIndex, update } }) => {
         state[cartIndex] = update;
         updateCartLocalStorage(state);

         return state;
      },
      removeProduct: (state, { payload: { cartIndex } }) => {
         state.splice(cartIndex, 1);
         updateCartLocalStorage(state);
      },
      resetCart: (state) => {
         removeCartLocalStorage();
         return [];
      }
   }
});

export const { addProductToCart, updateProduct, removeProduct, resetCart } =
   cartSlice.actions;

export default cartSlice.reducer;
