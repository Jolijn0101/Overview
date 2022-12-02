import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTodos,
  selectProjects,
  createTodo,
  setLoadingStatus,
  removedProject,
  removeTodo,
  setTaskMenuState,
  selectTaskMenuState,
} from '../../Redux/todoistSlice';
import './ProjectElement.css';
import { api } from '../../App/App';
import TaskMenu from './TaskMenu/TaskMenu';

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
  let projectTasks = projectObject ? tasks.filter((tasks) => tasks.projectId === projectObject.id) : false;

  function openAddTodoMenu() {
    if (toggle === false) {
      document.querySelector(`#project__add-todo_${projectObject.id} h4`).style.display = 'none';
      document.querySelector(`#add-todo_toggle_btn_${projectObject.id}`).innerHTML = '-';
      document.querySelector(`#add-todo_toggle_btn_${projectObject.id}`).style.backgroundColor = 'var(--third-color)';
      document.querySelector(`#add-todo__input_field_${projectObject.id}`).style.display = 'flex';
      setToggle(true);
    }
    if (toggle === true) {
      document.querySelector(`#project__add-todo_${projectObject.id} h4`).style.display = 'inline';
      document.querySelector(`#add-todo_toggle_btn_${projectObject.id}`).innerHTML = '+';
      document.querySelector(`#add-todo_toggle_btn_${projectObject.id}`).style.backgroundColor = 'var(--second-color)';
      document.querySelector(`#add-todo__input_field_${projectObject.id}`).style.display = 'none';
      setToggle(false);
    }
  }

  function addnewTodo() {
    if (!newTodo) {
      document.querySelector(`#add-todo__input_field_${projectObject.id} input`).style.border = 'solid red 2px';
    } else {
      dispatch(setLoadingStatus(true));
      api
        .addTask({ content: newTodo, projectId: projectObject.id })
        .then((task) =>
          dispatch(
            createTodo(task),
            setNewTodo(''),
            (document.querySelector(`#add-todo__input_field_${projectObject.id} input`).style.border = 'solid 2px var(--third-color)'),
            openAddTodoMenu(),
            dispatch(setLoadingStatus(false))
          )
        )
        .catch((error) => console.log(error));
    }
  }

  function checkTodo(id) {
    function checkTodoFalse(error) {
      console.log(error);
      dispatch(setLoadingStatus(false));
      alert('server error, try again');
      document.querySelector(`#check-box${id}`).classList.toggle('project__check-box_checked');
    }
    function checkTodoTrue(isSuccess) {
      console.log(isSuccess);
      dispatch(removeTodo(id));
      dispatch(setLoadingStatus(false));
    }
    document.querySelector(`#check-box${id}`).classList.toggle('project__check-box_checked');
    setTimeout(() => {
      dispatch(setLoadingStatus(true));
      api
        .closeTask(id)
        .then((isSuccess) => checkTodoTrue(isSuccess))
        .catch((error) => checkTodoFalse(error));
    }, 1500);
  }

  function openTaskMenu(id) {
    dispatch(setTaskMenuState({ state: true, id: id }));
  }

  function removeProject() {
    function removeProjectTrue() {
      dispatch(removedProject(projectObject.id));
      dispatch(setLoadingStatus(false));
    }
    function removeProjectFalse(error) {
      console.log(error);
      dispatch(setLoadingStatus(false));
      alert('Server Error, try again');
    }
    dispatch(setLoadingStatus(true));
    api
      .deleteProject(projectObject.id)
      .then((isSuccess) => (isSuccess === true ? removeProjectTrue() : null))
      .catch((error) => removeProjectFalse(error));
  }

  return (
    <div className="ProjectElement">
      {projectObject ? (
        <>
          <TaskMenu />
          {projectProp ? <h2>{projectName}</h2> : <h1>{projectName}</h1>}
          <ul className="project__todo-list">
            {projectTasks.length >= 1 ? (
              projectTasks.map((task) => {
                return (
                  <li className="project__todo" key={task.id}>
                    <div className="project__check-box" id={`check-box${task.id}`} onClick={() => checkTodo(task.id)}>
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p>{task.content}</p>
                    <svg
                      className="dots_ico"
                      onClick={() => openTaskMenu(task.id)}
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </li>
                );
              })
            ) : (
              <li className="project__todo">
                <p>Create the first task</p>
              </li>
            )}
          </ul>
          <div className={`project__add-todo`} id={`project__add-todo_${projectObject.id}`}>
            <div className={`add-todo_toggle_btn`} id={`add-todo_toggle_btn_${projectObject.id}`} onClick={openAddTodoMenu}>
              +
            </div>
            <h4>add Todo</h4>
            <div className="add-todo__input_field" id={`add-todo__input_field_${projectObject.id}`}>
              <input type="text" placeholder="type new task..." value={newTodo} onChange={trackNewTodo} />
              <button onClick={addnewTodo}>send</button>
            </div>
          </div>
          {projectName === 'Inbox' ? null : (
            <div className="project__remove-project" onClick={removeProject}>
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
          )}
        </>
      ) : (
        <h2>This project is removed</h2>
      )}
    </div>
  );
};

export default ProjectElement;
