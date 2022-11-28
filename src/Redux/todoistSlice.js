import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
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
  projects: [
    { id: '220474322', color: 'grey', name: 'Inbox' },
    { id: '220474323', color: 'red', name: 'Persoonlijk' },
    { id: '220474324', color: 'blue', name: 'Hobby' },
    { id: '220474325', color: 'green', name: 'Project 2' },
  ],
  tasks: [
    //Inbox tasks
    { id: '2995104339', content: 'Check mail', projectId: '220474322' },
    { id: '2995104340', content: 'watch Netflix', projectId: '220474322' },
    { id: '2995104341', content: 'book vacation', projectId: '220474322' },

    //persoonlijk tasks
    { id: '2995104342', content: 'vacum kitchen', projectId: '220474323' },
    { id: '2995104343', content: 'Buy Milk', projectId: '220474323' },
    { id: '2995104344', content: 'clean bathroom', projectId: '220474323' },

    //Hobby
    { id: '2995104345', content: 'sew hem', projectId: '220474324' },
    { id: '2995104346', content: 'Buy skirt hook', projectId: '220474324' },
    { id: '2995104347', content: 'draw pattern', projectId: '220474324' },

    //Project 2
    { id: '2995104348', content: 'todo 1', projectId: '220474325' },
    { id: '2995104349', content: 'todo 2', projectId: '220474325' },
    { id: '2995104350', content: 'todo 3', projectId: '220474325' },
  ],
  loading: true,
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
      console.log(action.payload);
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
      console.log(action.payload);
    },
  },
});

export const selectLoggedIn = (state) => state.todoist.loggedIn;
export const selectSideMenuState = (state) => state.todoist.sideMenuState;
export const selectAccessTokenState = (state) => state.todoist.access_token;
export const selectloadingStatus = (state) => state.todoist.loading;
export const selectProjects = (state) => state.todoist.projects;
export const selectColor_list = (state) => state.todoist.color_list;
export const selectTasks = (state) => state.todoist.tasks;
export const { setSideMenu, setLogInStatus, setAccessToken, updateProjects, updateTasks, setLoadingStatus } = todoistSlice.actions;
export default todoistSlice.reducer;
