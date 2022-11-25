import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  sideMenuState: false,
  access_token: false,
  projects: false,
  tasks: false,
  loading: false,
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
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const loggedIn = (state) => state.todoist.loggedIn;
export const sideMenuState = (state) => state.todoist.sideMenuState;
export const accessTokenState = (state) => state.todoist.access_token;
export const loadingStatus = (state) => state.todoist.loading;
export const { setSideMenu, setLogInStatus, setAccessToken, updateProjects, updateTasks, setLoadingStatus } = todoistSlice.actions;
export default todoistSlice.reducer;
