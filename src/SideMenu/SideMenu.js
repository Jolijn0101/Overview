import React from 'react';
import './SideMenu.css';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <ul>
        <li>
          <h3>Inbox</h3>
        </li>
        <li>
          <h3>Overview</h3>
        </li>
        <li>
          <h3>Projects</h3>
          <ul className="project-list">
            <li>
              <div className="project-color"></div>
              <h4>Persoonlijk</h4>
            </li>
            <li>
              <div className="project-color"></div>
              <h4>Klussen</h4>
            </li>
            <li>
              <div className="project-color"></div>
              <h4>Werk</h4>
            </li>
            <li>
              <div className="project-color"></div>
              <h4>Hobby</h4>
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
