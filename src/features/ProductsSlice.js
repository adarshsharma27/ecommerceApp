import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsData: [],
};

export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productsData.find(
        (elem) => elem.$id === action.payload.$id
      );
      if (item) {
        item.quantity++;
      } else {
        state.productsData.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const filteredItem = state.productsData.filter(
        (elem) => elem.$id !== action.payload
      );
      state.productsData = filteredItem;
    },
    resetCart: (state) => {
      state.productsData = [];
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = ProductsSlice.actions;
export default ProductsSlice.reducer;
