import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, removeItemFromCart, updateCartItemQuantity } from '../../utils/cartUtils';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      console.log(product, quantity);
      
      const updatedCart = addItemToCart(state.items, product, quantity);
      
      state.items = updatedCart.items;
      state.totalQuantity = updatedCart.totalQuantity;
      state.totalAmount = updatedCart.totalAmount;
    },
    removeFromCart: (state, action) => {
      const {productId} = action.payload;
      const updatedCart = removeItemFromCart(state.items, productId);
      
      state.items = updatedCart.items;
      state.totalQuantity = updatedCart.totalQuantity;
      state.totalAmount = updatedCart.totalAmount;
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const updatedCart = updateCartItemQuantity(state.items, product, quantity);
      
      state.items = updatedCart.items;
      state.totalQuantity = updatedCart.totalQuantity;
      state.totalAmount = updatedCart.totalAmount;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;