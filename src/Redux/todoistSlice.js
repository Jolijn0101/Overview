import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  sideMenuState: false,
  projectMenuState: false,
  taskMenuState: { state: false, id: false },
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
    { id: '220474323', color: 'red', name: 'Work' },
    { id: '220474324', color: 'blue', name: 'House' },
  ],
  todos: [
    //Inbox
    {
      id: '2995104339',
      content: 'Check mail',
      due: null,
      priority: 1,
      projectId: '220474322',
    },
    { id: '2995104340', content: 'pay taxes', due: { date: '2023-03-02' }, priority: 1, projectId: '220474322' },
    { id: '2995104341', content: 'book vacation', due: null, priority: 1, projectId: '220474322' },

    //work
    { id: '2995104342', content: 'check mail', due: null, priority: 1, projectId: '220474323' },
    { id: '2995104343', content: 'clean desk', due: null, priority: 1, projectId: '220474323' },
    { id: '2995104344', content: 'update software', due: null, priority: 1, projectId: '220474323' },

    //House
    { id: '2995104345', content: 'clean kitchen', due: null, priority: 2, projectId: '220474324' },
    { id: '2995104346', content: 'paint door', due: null, priority: 4, projectId: '220474324' },
    { id: '2995104347', content: 'clean windows', due: null, priority: 1, projectId: '220474324' },


  ],
  loading: false,
};

export const todoistSlice = createSlice({
  name: 'todoist',
  initialState,
  reducers: {
    setSideMenu: (state, action) => {
      state.sideMenuState = action.payload;
    },
    setProjectMenuState: (state, action) => {
      state.projectMenuState = action.payload;
    },
    setTaskMenuState: (state, action) => {
      state.taskMenuState = action.payload;
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
      state.todos = action.payload;
      console.log(action.payload);
    },
    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    createProject: (state, action) => {
      state.projects.push(action.payload);
    },
    removedProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
      state.todos = state.todos.filter((todo) => todo.projectId !== action.payload);
    },
    saveNewDeadline: (state, action) => {
      let taskObjectIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[taskObjectIndex] = action.payload;
    },
    setNewPriority: (state, action) => {
      let taskObjectIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[taskObjectIndex] = action.payload;
    },
  },
});

export const selectLoggedIn = (state) => state.todoist.loggedIn;
export const selectSideMenuState = (state) => state.todoist.sideMenuState;
export const selectAccessTokenState = (state) => state.todoist.access_token;
export const selectloadingStatus = (state) => state.todoist.loading;
export const selectProjects = (state) => state.todoist.projects;
export const selectColor_list = (state) => state.todoist.color_list;
export const selectTodos = (state) => state.todoist.todos;
export const selectProjectMenuState = (state) => state.todoist.projectMenuState;
export const selectTaskMenuState = (state) => state.todoist.taskMenuState;
export const {
  setSideMenu,
  setLogInStatus,
  setAccessToken,
  updateProjects,
  updateTasks,
  setLoadingStatus,
  createTodo,
  removedProject,
  removeTodo,
  createProject,
  setProjectMenuState,
  setTaskMenuState,
  saveNewDeadline,
  setNewPriority,
} = todoistSlice.actions;
export default todoistSlice.reducer;
