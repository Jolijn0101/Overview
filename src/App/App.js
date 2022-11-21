import { useState } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import Project from '../Project/Project';

function App() {
  const [logIn, setlogin] = useState('');

  return <div className="App">{logIn === false ? <LoginPage /> : <Project />}</div>;
}

export default App;
