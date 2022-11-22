import React, { useEffect } from 'react';
import './SideMenu.css';
import { useSelector, useDispatch } from 'react-redux';
import { sideMenuState, setSideMenu } from '../Redux/todoistSlice';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const sideMenu_state = useSelector(sideMenuState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.screen.width >= 768) {
      document.querySelector('.side-menu').style.transform = 'translateX(0)';
    } else {
      if (sideMenu_state === true) {
        document.querySelector('.side-menu').style.transform = 'translateX(0)';
      } else if (sideMenu_state === false) {
        document.querySelector('.side-menu').style.transform = 'translateX(15rem)';
      }
    }
  }, [sideMenu_state]);

  function closeSideMenu() {
    dispatch(setSideMenu(false));
  }

  return (
    <div className="side-menu">
      <svg
        className="closeBtn"
        onClick={closeSideMenu}
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
          fill="currentColor"
        ></path>
      </svg>
      <ul>
        <li>
          <Link className="link" to={'/Project/Inbox'} onClick={closeSideMenu}>
            <h3>Inbox</h3>
          </Link>
        </li>
        <li>
          <Link className="link" to={'/Project/Overview'} onClick={closeSideMenu}>
            <h3>Overview</h3>
          </Link>
        </li>
        <li>
          <h3>Projects</h3>
          <ul className="project-list">
            <li>
              <Link className="link" to={'/Project/Persoonlijk'} onClick={closeSideMenu}>
                <div className="project-color"></div>
                <h4>Persoonlijk</h4>
              </Link>
            </li>
            <li>
              <Link className="link" to={'/Project/Klussen'} onClick={closeSideMenu}>
                <div className="project-color"></div>
                <h4>Klussen</h4>
              </Link>
            </li>
            <li>
              <Link className="link" to={'/Project/Werk'} onClick={closeSideMenu}>
                <div className="project-color"></div>
                <h4>Werk</h4>
              </Link>
            </li>
            <li>
              <Link className="link" to={'/Project/Hobby'} onClick={closeSideMenu}>
                <div className="project-color"></div>
                <h4>Hobby</h4>
              </Link>
            </li>
          </ul>
        </li>
        <li id="log-out">
          <svg className="log-out_icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 13L16 11 7 11 7 8 2 12 7 16 7 13z"></path>
            <path d="M20,3h-9C9.897,3,9,3.897,9,5v4h2V5h9v14h-9v-4H9v4c0,1.103,0.897,2,2,2h9c1.103,0,2-0.897,2-2V5C22,3.897,21.103,3,20,3z"></path>
          </svg>
          <h3>Log Out</h3>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
