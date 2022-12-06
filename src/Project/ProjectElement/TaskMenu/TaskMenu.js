import React, { useEffect, useState } from 'react';
import './TaskMenu.css';
import { selectTaskMenuState, setTaskMenuState, removeTodo, setLoadingStatus, saveNewDeadline, selectTodos, setNewPriority } from '../../../Redux/todoistSlice';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../../App/App';

const TaskMenu = () => {
  const taskMenuState = useSelector(selectTaskMenuState);
  const [dropDownState, setDropDownState] = useState(false);
  const [priorityArr, setpriorityArr] = useState([1, 'white']);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [newDeadline, setNewDeadline] = useState('');
  const trackNewDeadline = (e) => setNewDeadline(e.target.value);
  let todoObject = todos.find((todo) => todo.id === taskMenuState.id);

  useEffect(() => {
    if (taskMenuState.state === true) {
      console.log(todoObject);
      //checks if theres a deadline
      todoObject.due === null ? setNewDeadline('') : setNewDeadline(todoObject.due.date);
      //checks if thers a priority
      if (todoObject.priority !== [1, 'white']) {
        switch (todoObject.priority) {
          case 1:
            setpriorityArr([1, 'white']);
            break;
          case 2:
            setpriorityArr([2, 'blue']);
            break;
          case 3:
            setpriorityArr([3, 'orange']);
            break;
          case 4:
            setpriorityArr([4, 'red']);
            break;

          default:
            break;
        }
      }
      document.querySelector('#task_menu_container').style.display = 'flex';
    }
    if (taskMenuState.state === false) {
      document.querySelector('#task_menu_container').style.display = 'none';
    }
  }, [taskMenuState]);

  function closeTaskMenu() {
    //close menu
    dispatch(setTaskMenuState({ state: false, id: false }));

    //save deadline
    if (newDeadline !== todoObject.due.date) {
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
          alert('Server Error, add deadline again');
        }
        api
          .updateTask(taskMenuState.id, { due_date: newDeadline })
          .then((isSuccess) => saveDataTrue(isSuccess))
          .catch((error) => saveDataFalse(error));
      }
    }

    //save priority
    if (priorityArr[0] !== todoObject.priority) {
      if (priorityArr[0] !== todoObject.priority) {
        dispatch(setLoadingStatus(true));
        function saveDataTrue(isSuccess) {
          console.log(isSuccess);
          dispatch(setNewPriority(isSuccess));
          dispatch(setLoadingStatus(false));
        }
        function saveDataFalse(error) {
          console.log(error);
          dispatch(setLoadingStatus(false));
          alert('Server Error, add priority again');
        }
        api
          .updateTask(taskMenuState.id, { priority: priorityArr[0] })
          .then((isSuccess) => saveDataTrue(isSuccess))
          .catch((error) => saveDataFalse(error));
      }
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

  function dropDownMenu() {
    if (dropDownState === false) {
      document.querySelector('#task_menu #drop_menu_top #arrow').style.transform = 'rotate(180deg)';
      document.querySelector('#task_menu #drop_menu_bottom').style.display = 'block';
      setDropDownState(true);
    }
    if (dropDownState === true) {
      document.querySelector('#task_menu #drop_menu_top #arrow').style.transform = 'rotate(0deg)';
      document.querySelector('#task_menu #drop_menu_bottom').style.display = 'none';
      setDropDownState(false);
    }
  }

  function changePriority(num, color) {
    setpriorityArr([num, color]);
    dropDownMenu();
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
        <section id="priority_task_container">
          <h4>add priority</h4>
          <div id="drop_menu">
            <div id="drop_menu_top" onClick={dropDownMenu}>
              <p>
                priority {priorityArr[0]}
                {priorityArr[1] === 'white' ? (
                  <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 17v5H2V3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4zM4 5v10h14.554l-2.858-5 2.858-5H4z"></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill={priorityArr[1]}
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"></path>
                    </g>
                  </svg>
                )}
              </p>
              <svg
                stroke="currentColor"
                id="arrow"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
              </svg>
            </div>
            <ul id="drop_menu_bottom">
              <li id="priority_1" onClick={() => changePriority(1, 'white')}>
                <p>
                  priority 1
                  <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 17v5H2V3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4zM4 5v10h14.554l-2.858-5 2.858-5H4z"></path>
                    </g>
                  </svg>
                </p>
              </li>
              <li id="priority_2" onClick={() => changePriority(2, 'blue')}>
                <p>
                  priority 2
                  <svg stroke="currentColor" fill="blue" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"></path>
                    </g>
                  </svg>
                </p>
              </li>
              <li id="priority_3" onClick={() => changePriority(3, 'orange')}>
                <p>
                  priority 3
                  <svg stroke="currentColor" fill="orange" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"></path>
                    </g>
                  </svg>
                </p>
              </li>
              <li id="priority_4" onClick={() => changePriority(4, 'red')}>
                <p>
                  priority 4
                  <svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"></path>
                    </g>
                  </svg>
                </p>
              </li>
            </ul>
          </div>
        </section>
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
