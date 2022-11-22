import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  sideMenuState: false,
};

export const todoistSlice = createSlice({
  name: 'todoist',
  initialState,
  reducers: {
    setSideMenu: (state, action) => {
      state.sideMenuState = action.payload;
    },
    setLogInStatus: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const loggedIn = (state) => state.todoist.loggedIn;
export const sideMenuState = (state) => state.todoist.sideMenuState;
export const { setSideMenu, setLogInStatus } = todoistSlice.actions;
export default todoistSlice.reducer;
