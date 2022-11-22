import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';
import SideMenu from '../SideMenu/SideMenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loggedIn } from '../Redux/todoistSlice';
import { useSelector } from 'react-redux';

function App() {
  const logInStatus = useSelector(loggedIn);

  return (
    <BrowserRouter>
      <div className="App">
        {logInStatus === false ? (
          <LoginPage />
        ) : (
          <div>
            <SideMenu />
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
