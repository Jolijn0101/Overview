import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideMenu: false,
};

export const todoistSlice = createSlice({
  name: 'todoist',
  initialState,
  reducers: {},
});

export default todoistSlice.reducer;
