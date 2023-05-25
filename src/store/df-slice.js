import { createSlice } from '@reduxjs/toolkit';

const dfSlice = createSlice({
  name: 'df',
  initialState: {
    data: null,
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload
    },
    // addItemToCart(state, action) {
    //   const newItem = action.payload;
    //   const existingItem = state.items.find((item) => item.id === newItem.id);
    //   state.totalQuantity++;
    //   state.changed = true;
    //   if (!existingItem) {
    //     state.items.push({
    //       id: newItem.id,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //       name: newItem.title,
    //     });
    //   } else {
    //     existingItem.quantity++;
    //     existingItem.totalPrice = existingItem.totalPrice + newItem.price;
    //   }
    // },
    // removeItemFromCart(state, action) {
    //   const id = action.payload;
    //   const existingItem = state.items.find((item) => item.id === id);
    //   state.totalQuantity--;
    //   state.changed = true;
    //   if (existingItem.quantity === 1) {
    //     state.items = state.items.filter((item) => item.id !== id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    //   }
    // },
  },
});

export const dfActions = dfSlice.actions;

export default dfSlice;
