import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: true,
  sideMenuState: false,
  access_token: false,
  color_list: [
    { berry_red: '#b8256f' },
    { red: '#db4035' },
    { orange: '#ff9933' },
    { yellow: '#fad000' },
    { olive_green: '#afb83b' },
    { lime_green: '#7ecc49' },
    { green: '#299438' },
    { mint_green: '#6accbc' },
    { teal: '#158fad' },
    { sky_blue: '#14aaf5' },
    { light_blue: '#96c3eb' },
    { blue: '#4073ff' },
    { grape: '#884dff' },
    { violet: '#af38eb' },
    { lavender: '#eb96eb' },
    { magenta: '#e05194' },
    { salmon: '#ff8d85' },
    { charcoal: '#808080' },
    { grey: '#b8b8b8' },
    { taupe: '#ccac93' },
  ],
  projects: false /*[
    { name: 'Persoonlijk 🙂', color: 'grey', id: '2296556354' },
    { name: 'huishouden', color: 'berry_red', id: '2299971835' },
    { name: 'klussen', color: 'blue', id: '2299971852' },

    { name: 'House', color: 'red', id: 1 },
    { name: 'Work', color: 'blue', id: 2 },
    { name: 'Tennisclub', color: 'green', id: 3 },
  ]*/,
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
export const allProjects = (state) => state.todoist.projects;
export const color_list = (state) => state.todoist.color_list;
export const { setSideMenu, setLogInStatus, setAccessToken, updateProjects, updateTasks, setLoadingStatus } = todoistSlice.actions;
export default todoistSlice.reducer;
