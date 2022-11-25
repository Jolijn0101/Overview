import './App.css';
import { useEffect } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';
import SideMenu from '../SideMenu/SideMenu';
import ErrorPage from '../ErrorPage/ErrorPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectLoggedIn, selectAccessTokenState, updateProjects, updateTasks } from '../Redux/todoistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { selectloadingStatus, setLoadingStatus } from '../Redux/todoistSlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function App() {
  const logInStatus = useSelector(selectLoggedIn);
  const AccessToken = useSelector(selectAccessTokenState);
  let api = new TodoistApi(AccessToken);
  const dispatch = useDispatch();
  const loadingState = useSelector(selectloadingStatus);

  useEffect(() => {
    if (AccessToken !== false) {
      // get the projects
      api
        .getProjects()
        .then((projects) => {
          //removes inbox from the list
          projects.shift();
          dispatch(updateProjects(projects));
          // get tasks after projects
          api
            .getTasks()
            .then((tasks) => {
              dispatch(updateTasks(tasks));
              // set loading off after receiving tasks
              dispatch(setLoadingStatus(false));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [AccessToken]);

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          {loadingState ? <LoadingScreen /> : null}
          <SideMenu />
          <Routes>
            {logInStatus ? <Route path="/" element={<Project />} /> : <Route path="/" element={<LoginPage />} />}
            <Route path="/Project/:projectName" element={<Project />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
