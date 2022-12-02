import React, { useState, useEffect } from 'react';
import './ProjectMenu.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectColor_list, selectProjectMenuState, setProjectMenuState, setLoadingStatus } from '../../Redux/todoistSlice';
import { createProject } from '../../Redux/todoistSlice';
import { useNavigate } from 'react-router-dom';
import { api } from '../../App/App';

const ProjectMenu = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const projectMenuState = useSelector(selectProjectMenuState);
  const colorList = useSelector(selectColor_list);
  const [projectName, setProjectName] = useState('');
  const [projectColor, setProjectColor] = useState('');
  const trackNewProject = (e) => setProjectName(e.target.value);

  //closes and opens the menu if projectState changes
  useEffect(() => {
    if (projectMenuState === false) {
      document.querySelector('#project_menu_container').style.display = 'none';
    }
    if (projectMenuState === true) {
      //wait until side menu is closed and open project menu
      setTimeout(() => {
        document.querySelector('#project_menu_container').style.display = 'flex';
      }, 200);
    }
  }, [projectMenuState]);

  function closeProjectMenu() {
    dispatch(setProjectMenuState(false));
  }

  function setColor(color, buttonId) {
    if (projectColor) {
      document.querySelector(projectColor[1]).style.backgroundColor = 'var(--fifth-color)';
      document.querySelector(projectColor[1]).innerHTML = '+';
    }
    setProjectColor([color, buttonId]);
    document.querySelector(buttonId).style.backgroundColor = 'gray';
    document.querySelector(buttonId).innerHTML = '-';
  }

  function addNewProject() {
    if (projectName === '') {
      document.querySelector('#project_menu input').style.border = 'solid 2px red';
    }
    if (projectColor === '') {
      document.querySelector('#project_color_list').style.border = 'solid 2px red';
    } else {
      function addNewProjectTrue(project) {
        dispatch(createProject(project));
        dispatch(setLoadingStatus(false));

        //go to new project page
        navigate(`/Project/${projectName}`);

        //clear eventually 'nothing typed' warnings
        document.querySelector('#project_menu input').style.border = 'solid 2px #4a62e4ff';
        document.querySelector('#project_color_list').style.border = 'solid 2px #4a62e4ff';

        //reset styling colorBtn and inputfield, reset state values too
        setProjectName('');
        document.querySelector(projectColor[1]).style.backgroundColor = 'var(--fifth-color)';
        document.querySelector(projectColor[1]).innerHTML = '+';
        setProjectColor('');
      }
      function addNewProjectFalse(error) {
        console.log(error);
        dispatch(setLoadingStatus(false));
        alert('Server Error, try again');
      }

      //close menu before loading
      closeProjectMenu();
      dispatch(setLoadingStatus(true));

      api
        .addProject({ name: projectName, color: projectColor[0] })
        .then((project) => addNewProjectTrue(project))
        .catch((error) => addNewProjectFalse(error));
    }
  }

  return (
    <div id="project_menu_container">
      <div id="project_menu">
        <svg
          className="closeBtn"
          onClick={closeProjectMenu}
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
        <input type="text" onChange={trackNewProject} value={projectName} />
        <h3>Project color</h3>
        <ul id="project_color_list">
          {colorList.map((color) => {
            let colorKey = Object.keys(color).toString();
            let colorTitle;
            colorKey.includes('_') ? (colorTitle = colorKey.replace('_', ' ')) : (colorTitle = colorKey);
            return (
              <li key={`${colorKey}_key`}>
                <div id="color" style={{ backgroundColor: Object.values(color) }}></div>
                <h4>{colorTitle}</h4>
                <div className="plusBtn" id={`plusBtn_${colorKey}`} onClick={() => setColor(colorKey, `#plusBtn_${colorKey}`)}>
                  +
                </div>
              </li>
            );
          })}
        </ul>
        <button className="button" onClick={addNewProject}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProjectMenu;
