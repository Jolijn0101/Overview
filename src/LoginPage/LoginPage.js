import React, { useRef, useEffect } from 'react';
import './LoginPage.css';
import notepad from '../images/notepad.png';
import overview_logo from '../images/overview_logo.png';
import { useDispatch } from 'react-redux';
import { setLogInStatus, setAccessToken, setLoadingStatus } from '../Redux/todoistSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const scope = 'data:read_write,data:delete,project:delete';
  const code = useRef(false);
  const clientId = process.env.REACT_APP_API_ID;
  const clientSecret = process.env.REACT_APP_API_SECRET;
  const redirectUri = 'http://localhost:3000/';

  function logIn() {
    window.location = `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=${scope}&state=secretstring`;
  }

  useEffect(() => {
    if (window.location.href.includes('code')) {
      dispatch(setLogInStatus(true));
      dispatch(setLoadingStatus(true));
      // get code for the key
      let url = window.location.search;
      url = url.substring(1).split('&');
      code.current = url[0].substring(5);
      window.history.replaceState(null, '', 'http://localhost:3000/');

      // fetch the key with the code
      fetch('https://todoist.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${clientId}&client_secret=${clientSecret}&code=${code.current}&redirect_uri=${redirectUri}`,
      })
        .then((response) => response.json())
        .then((data) => dispatch(setAccessToken(data.access_token)))
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);

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
