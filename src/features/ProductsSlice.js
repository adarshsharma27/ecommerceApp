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
    incrementQuantity: (state, action) => {
      const item = state.productsData.find(
        (elem) => elem.$id === action.payload
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productsData.find(
        (elem) => elem.$id === action.payload
      );
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  incrementQuantity,
  decrementQuantity,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
