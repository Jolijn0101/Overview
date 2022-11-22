import { useState } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';
import SideMenu from '../SideMenu/SideMenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [logIn, setlogin] = useState('');

  return (
    <BrowserRouter>
      <div className="App">
        {logIn === false ? (
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
