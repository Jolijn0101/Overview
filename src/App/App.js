import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';
import SideMenu from '../SideMenu/SideMenu';
import ErrorPage from '../ErrorPage/ErrorPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loggedIn } from '../Redux/todoistSlice';
import { useSelector } from 'react-redux';

function App() {
  const logInStatus = useSelector(loggedIn);

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
