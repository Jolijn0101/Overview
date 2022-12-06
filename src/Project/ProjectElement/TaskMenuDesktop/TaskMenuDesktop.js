import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskMenuState, selectTodos } from '../../../Redux/todoistSlice';
import './TaskMenuDesktop.css';

const TaskMenuDesktop = () => {
  const taskMenuState = useSelector(selectTaskMenuState);
  const [dropDownState, setDropDownState] = useState(false);
  const [priorityArr, setpriorityArr] = useState([1, 'white']);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [newDeadline, setNewDeadline] = useState('');
  const trackNewDeadline = (e) => setNewDeadline(e.target.value);
  let todoObject = todos.find((todo) => todo.id === taskMenuState.id);

  function dropDownMenu() {
    if (dropDownState === false) {
      document.querySelector('#drop_menu_top #arrow').style.transform = 'rotate(180deg)';
      document.querySelector('#drop_menu_bottom').style.display = 'block';
      setDropDownState(true);
    }
    if (dropDownState === true) {
      document.querySelector('#drop_menu_top #arrow').style.transform = 'rotate(0deg)';
      document.querySelector('#drop_menu_bottom').style.display = 'none';
      setDropDownState(false);
    }
  }

  function changePriority(num, color) {
    setpriorityArr([num, color]);
    dropDownMenu();
  }
  return (
    <div id="TaskMenuDesktop">
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
              <svg stroke="currentColor" fill={priorityArr[1]} stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
      <input type="date" id="deadline" name="deadline"></input>
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
    </div>
  );
};

export default TaskMenuDesktop;
