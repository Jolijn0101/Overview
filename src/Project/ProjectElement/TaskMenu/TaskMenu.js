import React, { useEffect, useState } from 'react';
import './TaskMenu.css';
import { selectTaskMenuState, setTaskMenuState, removeTodo, setLoadingStatus, saveNewDeadline, selectTodos } from '../../../Redux/todoistSlice';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../../App/App';

const TaskMenu = () => {
  const taskMenuState = useSelector(selectTaskMenuState);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [newDeadline, setNewDeadline] = useState('');
  const trackNewDeadline = (e) => setNewDeadline(e.target.value);

  useEffect(() => {
    if (taskMenuState.state === true) {
      let todoObject = todos.find((todo) => todo.id === taskMenuState.id);
      console.log(todoObject);
      todoObject.due === null ? setNewDeadline('') : setNewDeadline(todoObject.due.date);
      document.querySelector('#task_menu_container').style.display = 'flex';
    }
    if (taskMenuState.state === false) {
      document.querySelector('#task_menu_container').style.display = 'none';
    }
  }, [taskMenuState]);

  function closeTaskMenu() {
    //close menu
    dispatch(setTaskMenuState({ state: false, id: false }));

    //save new data
    if (newDeadline !== '') {
      dispatch(setLoadingStatus(true));
      function saveDataTrue(isSuccess) {
        console.log(isSuccess);
        dispatch(saveNewDeadline(isSuccess));
        dispatch(setLoadingStatus(false));
      }
      function saveDataFalse(error) {
        console.log(error);
        dispatch(setLoadingStatus(false));
        alert('Server Error, try again');
      }
      api
        .updateTask(taskMenuState.id, { due_date: newDeadline })
        .then((isSuccess) => saveDataTrue(isSuccess))
        .catch((error) => saveDataFalse(error));
    }
  }

  function removeTask() {
    function removeTaskTrue(isSuccess) {
      console.log(isSuccess);
      dispatch(removeTodo(taskMenuState.id));
      dispatch(setLoadingStatus(false));
    }

    function removeTaskFalse(error) {
      dispatch(setLoadingStatus(false));
      console.log(error);
      alert('Server Error, try again');
    }
    dispatch(setTaskMenuState({ state: false, id: false }));
    dispatch(setLoadingStatus(true));
    api
      .deleteTask(taskMenuState.id)
      .then((isSuccess) => removeTaskTrue(isSuccess))
      .catch((error) => removeTaskFalse(error));
  }

  return (
    <div id="task_menu_container">
      <div id="task_menu">
        <svg
          className="closeBtn"
          onClick={closeTaskMenu}
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
        <h2>Task Menu</h2>
        <section id="deadline_task_container">
          <h4>add deadline</h4>
          <input type="date" id="deadline" name="deadline" value={newDeadline} onChange={trackNewDeadline}></input>
        </section>
        <section id="remove_task_container" onClick={removeTask}>
          <svg
            className="task__trash-icon"
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
          <h4>Remove task</h4>
        </section>
      </div>
    </div>
  );
};

export default TaskMenu;
