import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuBar: false,
};

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleMenuBar: (state, action) => {
      state.menuBar = !state.menuBar;
    },
  },
});

export const { toggleMenuBar } = HomeSlice.actions;

export default HomeSlice.reducer;
