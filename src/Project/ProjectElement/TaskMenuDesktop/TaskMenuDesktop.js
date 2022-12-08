import React, {useState, useEffect} from 'react';
import './TaskMenuDesktop.css';
import {useSelector, useDispatch} from 'react-redux';
import {selectTodos, setNewPriority} from '../../../Redux/todoistSlice.js';

const TaskMenuDesktop = ({ taskId }) => {
  let task_id = taskId;
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false);
  const [priorityArr, setPriorityArr] = useState([1,'white']);
  const todos = useSelector(selectTodos);
  let todoObject = todos.find((todo) => todo.id === task_id);

//set priority by first render
  useEffect(() => {
    switch (todoObject.priority) {
      case 1:
        setPriorityArr([1, 'white']);
        break;
      case 2:
        setPriorityArr([2, 'blue']);
        break;
      case 3:
        setPriorityArr([3, 'orange']);
        break;
      case 4:
        setPriorityArr([4, 'red']);
        break;

      default:
        break;
    }
  }, []);

  function drop_down(){
    if(menuState === false){
      document.querySelector(`#TaskMenuDesktop${taskId} #arrow`).style.transform = 'rotate(180deg)';
      document.querySelector(`#TaskMenuDesktop${taskId} #drop_menu_bottom_desktop`).style.display = 'block';
      setMenuState(true);
    }
    if(menuState === true){
      document.querySelector(`#TaskMenuDesktop${taskId} #arrow`).style.transform = 'rotate(0deg)';
      document.querySelector(`#TaskMenuDesktop${taskId} #drop_menu_bottom_desktop`).style.display = 'none';
      setMenuState(false);
    }
  }
  function changePriority(num, color) {
    //only continue if priority isn't the same
    if (num !== todoObject.priority) {
      //saves the new priority in Redux
      let newPriorityObject = { id: todoObject.id, content: todoObject.content, due: { date: todoObject.due.date }, priority: num, projectId: todoObject.projectId }
      dispatch(setNewPriority(newPriorityObject));
      //sets the color and number in the DOM
      setPriorityArr([num, color])
    }
    drop_down()
}

  return (
    <div id={`TaskMenuDesktop${taskId}`} className='TaskMenuDesktop'>
    <div id="drop_menu_desktop">
    <div id="drop_menu_top_desktop" onClick={drop_down}>
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
    <ul id="drop_menu_bottom_desktop">
      <li id="priority_1" onClick={()=> changePriority(1,'white')}>
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
      <li id="priority_2" onClick={()=> changePriority(2,'blue')}>
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
      <li id="priority_3" onClick={()=> changePriority(3,'orange')}>
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
      <li id="priority_4" onClick={()=> changePriority(4,'red')}>
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
    </div>
  );
};

export default TaskMenuDesktop;
