import React from 'react';
import './Project.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSideMenu, selectProjects } from '../Redux/todoistSlice';
import ProjectElement from './ProjectElement/ProjectElement';

const Project = () => {
  let { projectName } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  function openSideMenu() {
    dispatch(setSideMenu(true));
  }
  return (
    <div className="project">
      <svg
        onClick={openSideMenu}
        className="mobile_menu_btn"
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      {projectName === 'Overview' ? (
        <>
          <h1 style={{ marginBottom: '3rem' }}>{projectName}</h1>
          {projects.map((project) => {
            return <ProjectElement projectProp={project.name} key={project.id} />;
          })}
        </>
      ) : (
        <ProjectElement />
      )}
    </div>
  );
};

export default Project;
