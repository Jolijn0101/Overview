import { useState } from 'react';
import './App.css';
import LoginPage from '../LoginPage/LoginPage.js';

function App() {
  const [logIn, setlogin] = useState('');

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
