import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideMenuState: false,
};

export const todoistSlice = createSlice({
  name: 'todoist',
  initialState,
  reducers: {
    setSideMenu: (state, action) => {
      state.sideMenuState = action.payload;
    },
  },
});

export const sideMenuState = (state) => state.todoist.sideMenuState;
export const { setSideMenu } = todoistSlice.actions;
export default todoistSlice.reducer;
