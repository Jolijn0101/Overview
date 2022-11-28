import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos, selectProjects, createTodo } from '../../Redux/todoistSlice';
import './ProjectElement.css';

const ProjectElement = ({ projectProp }) => {
  let { projectName } = useParams();

  //checks if there isn't a param for Inbox
  if (projectName === undefined && projectProp === undefined) {
    projectName = 'Inbox';
  }
  //checks if there is a projectProp
  if (projectProp) {
    projectName = projectProp;
  }
  const dispatch = useDispatch();
  const tasks = useSelector(selectTodos);
  const projects = useSelector(selectProjects);
  const [toggle, setToggle] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const trackNewTodo = (e) => setNewTodo(e.target.value);

  //finds the object of the project that needs to displayed
  const projectObject = projects ? projects.find((object) => object.name === projectName) : false;

  //gets the projectId from the projectobject and filters the tasks with the same project id
  let projectTasks = tasks.filter((tasks) => tasks.projectId === projectObject.id);

  function openAddTodoMenu() {
    if (toggle === false) {
      document.querySelector(`#project__add-todo_${projectName} h4`).style.display = 'none';
      document.querySelector(`#add-todo_toggle_btn_${projectName}`).innerHTML = '-';
      document.querySelector(`#add-todo_toggle_btn_${projectName}`).style.backgroundColor = 'var(--third-color)';
      document.querySelector(`#add-todo__input_field_${projectName}`).style.display = 'flex';
      setToggle(true);
    }
    if (toggle === true) {
      document.querySelector(`#project__add-todo_${projectName} h4`).style.display = 'inline';
      document.querySelector(`#add-todo_toggle_btn_${projectName}`).innerHTML = '+';
      document.querySelector(`#add-todo_toggle_btn_${projectName}`).style.backgroundColor = 'var(--second-color)';
      document.querySelector(`#add-todo__input_field_${projectName}`).style.display = 'none';
      setToggle(false);
    }
  }

  function addnewTodo() {
    if (!newTodo) {
      document.querySelector(`#add-todo__input_field_${projectName} input`).style.border = 'solid red 2px';
    } else {
      let id = 2995104350;
      dispatch(createTodo({ id: id++, content: newTodo, projectId: projectObject.id }));
      setNewTodo('');
      document.querySelector(`#add-todo__input_field_${projectName} input`).style.border = 'solid 2px var(--third-color)';
      openAddTodoMenu();
    }
  }

  return (
    <div className="ProjectElement">
      {projectProp ? <h2>{projectName}</h2> : <h1>{projectName}</h1>}
      <ul className="project__todo-list">
        {projectTasks.map((task) => {
          return (
            <li className="project__todo" key={task.id}>
              <div className="project__check-box">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <p>{task.content}</p>
              <svg className="dots_ico" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </li>
          );
        })}
      </ul>
      <div className={`project__add-todo`} id={`project__add-todo_${projectName}`}>
        <div className={`add-todo_toggle_btn`} id={`add-todo_toggle_btn_${projectName}`} onClick={openAddTodoMenu}>
          +
        </div>
        <h4>add Todo</h4>
        <div className="add-todo__input_field" id={`add-todo__input_field_${projectName}`}>
          <input type="text" placeholder="type new task..." value={newTodo} onChange={trackNewTodo} />
          <button onClick={addnewTodo}>send</button>
        </div>
      </div>
      <div className="project__remove-project">
        <svg
          className="project__trash-icon"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 448 512"
          height="1.8em"
          width="1.8em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
        </svg>
        <h4>remove project</h4>
      </div>
    </div>
  );
};

export default ProjectElement;
