import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shopId: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopId: (state, action) => {
      state.shopId = action.payload;
    }
  }
});

export const { setShopId } = shopSlice.actions;

export default shopSlice.reducer;
