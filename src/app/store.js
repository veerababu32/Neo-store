import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../feature/auth/authSlice';
import cartSlice from '../feature/cart/cartSlice';
import homeSlice from '../feature/home/homeSlice';

export const store = configureStore({
  reducer: {
    home: homeSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});
