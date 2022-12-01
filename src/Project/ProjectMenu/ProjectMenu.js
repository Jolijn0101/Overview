import React from 'react';
import './ProjectMenu.css';
import { useSelector } from 'react-redux';
import { selectColor_list } from '../../Redux/todoistSlice';

const ProjectMenu = () => {
  const colorList = useSelector(selectColor_list);
  return (
    <div id="project_menu_container">
      <div id="project_menu">
        <svg
          className="closeBtn"
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
        <h2>Create Project</h2>
        <h3>Project name</h3>
        <input type="text" id="project name" />
        <h3>Project color</h3>
        <ul id="project_color_list">
          {colorList.map((color) => {
            let colorKey = Object.keys(color).toString();

            if (colorKey.includes('_')) {
              colorKey = colorKey.replace('_', ' ');
            }

            return (
              <li>
                <div id="color" style={{ backgroundColor: Object.values(color) }}></div>
                <h4>{colorKey}</h4>
                <div className="plusBtn">
                  <p>+</p>
                </div>
              </li>
            );
          })}
        </ul>
        <button className="button">Add</button>
      </div>
    </div>
  );
};

export default ProjectMenu;
