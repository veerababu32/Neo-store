import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../feature/auth/authSlice';
import cartSlice from '../feature/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
