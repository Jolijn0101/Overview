import './App.css';
import { useEffect } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';
import SideMenu from '../SideMenu/SideMenu';
import ErrorPage from '../ErrorPage/ErrorPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loggedIn, accessTokenState, updateProjects, updateTasks } from '../Redux/todoistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TodoistApi } from '@doist/todoist-api-typescript';

function App() {
  const logInStatus = useSelector(loggedIn);
  const AccessToken = useSelector(accessTokenState);
  let api = new TodoistApi(AccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (AccessToken !== false) {
      console.log('begin met laden');
      // get the projects
      api
        .getProjects()
        .then((projects) => dispatch(updateProjects(projects)))
        .catch((error) => console.log(error));
      // get tasks
      api
        .getTasks()
        .then((tasks) => dispatch(updateTasks(tasks)))
        .catch((error) => console.log(error));
      console.log('eindig met laden');
    }
  }, [AccessToken]);

  return (
    <BrowserRouter>
      <div className="App">
        <div>
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
