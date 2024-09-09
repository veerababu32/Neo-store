import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bagCount: 0,
  items: [],
  total: 0,
  discount: 0,
  wishlistItems: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem = state.items.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.bagCount += 1;
        state.items.push({ ...itemToAdd });
      }

      state.discount += parseFloat(itemToAdd.price * (itemToAdd.discount / 10));
      state.total += itemToAdd.price;
    },
    removeCartItem: (state, action) => {
      if (state.bagCount > 0) state.bagCount -= action.payload;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addToWishlist: (state, action) => {
      const wishItem = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item.id === wishItem.id
      );

      if (!existingItem) {
        state.wishlistItems.push(wishItem);
      }
    },
    removeWishItem: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
    decBagCount: (state, action) => {
      if (state.bagCount > 0) state.bagCount -= action.payload;
    },
    removeAllCartItems: (state) => {
      state.items = [];
      state.total = 0;
      state.discount = 0;
      state.bagCount = 0;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  addToWishlist,
  removeWishItem,
  incBagCount,
  decBagCount,
  removeAllCartItems,
} = CartSlice.actions;

export default CartSlice.reducer;
