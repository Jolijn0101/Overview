import React from 'react';
import './LoginPage.css';
import notepad from '../images/notepad.png';
import overview_logo from '../images/overview_logo.png';

const LoginPage = () => {
  return (
    <div class="login_page">
      <img src={notepad} alt="notepad_img" />
      <div class="login_page__wrapper">
        <img src={overview_logo} alt="overview_logo" />
        <p>a new way to organise your tasks and goals in an easy way</p>
        <button className="button">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
