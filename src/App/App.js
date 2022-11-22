import { useState } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';
import SideMenu from '../SideMenu/SideMenu';
import { useDispatch } from 'react-redux';
import { setSideMenu } from '../Redux/todoistSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [logIn, setlogin] = useState('');
  const dispatch = useDispatch();

  function openSideMenu() {
    dispatch(setSideMenu(true));
  }

  return (
    <BrowserRouter>
      <div className="App">
        {logIn === false ? (
          <LoginPage />
        ) : (
          <div>
            <SideMenu />
            <svg
              onClick={openSideMenu}
              className="mobile_menu_btn"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <Routes>
              <Route path="/" element={<Project />} />
              <Route path="/Project/:projectName" element={<Project />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
