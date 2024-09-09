import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [] || sessionStorage.getItem('userData'),
  status: false || sessionStorage.getItem('isAuthenticated'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = '';
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('isAuthenticated');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
