import React from 'react';
import './LoginPage.css';
import notepad from '../images/notepad.png';
import overview_logo from '../images/overview_logo.png';
import { useDispatch } from 'react-redux';
import { setLogInStatus } from '../Redux/todoistSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  function logIn() {
    dispatch(setLogInStatus(true));
  }

  return (
    <div class="login_page">
      <img src={notepad} id="notepad_img" alt="notepad_img" />
      <div class="login_page__wrapper">
        <img src={overview_logo} id="overview_logo" alt="overview_logo" />
        <p>a new way to organise your tasks and goals in an easy way</p>
        <button className="button" onClick={logIn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
