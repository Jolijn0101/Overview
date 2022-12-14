import React, {useState, useEffect} from 'react';
import './TaskMenuDesktop.css';
import {useSelector, useDispatch} from 'react-redux';
import {selectTodos, setNewPriority, setLoadingStatus, removeTodo, saveNewDeadline} from '../../../Redux/todoistSlice.js';
import {api} from '../../../App/App.js';

const TaskMenuDesktop = ({ taskId }) => {
  let task_id = taskId;
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  let todoObject = todos.find((todo) => todo.id === task_id);

  //for deadline
  const [newDeadline, setNewDeadline] = useState('yyyy-mm-dd');

  //for priority
  const [menuState, setMenuState] = useState(false);
  const [priorityArr, setPriorityArr] = useState([1,'white']);

//set priority and deadline by first render
  useEffect(() => {
    if(todoObject.due !== null){
    setNewDeadline(todoObject.due.date);
   }
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
      //sets loading screen on
      dispatch(setLoadingStatus(true));

      //function if it went well
      function saveDataTrue(isSuccess) {
        console.log(isSuccess);
        dispatch(setNewPriority(isSuccess));
        setPriorityArr([num, color]);
        dispatch(setLoadingStatus(false));
      }

      //function if it gets an error
      function saveDataFalse(error) {
        console.log(error);
        dispatch(setLoadingStatus(false));
        alert('Server Error, add priority again');
      }
      api
        .updateTask(todoObject.id, { priority: num })
        .then((isSuccess) => saveDataTrue(isSuccess))
        .catch((error) => saveDataFalse(error));

    }
    drop_down()
}
  function trackNewDeadline(e){
    setNewDeadline(e.target.value);
  }
  function removeTask() {
    function removeTaskTrue(isSuccess) {
      console.log(isSuccess);
      dispatch(removeTodo(todoObject.id));
      dispatch(setLoadingStatus(false));
    }

    function removeTaskFalse(error) {
      dispatch(setLoadingStatus(false));
      console.log(error);
      alert('Server Error, try again');
    }
    dispatch(setLoadingStatus(true));
    api
      .deleteTask(todoObject.id)
      .then((isSuccess) => removeTaskTrue(isSuccess))
      .catch((error) => removeTaskFalse(error));
  }
  function saveDeadline(){
        // displays the loading page
        dispatch(setLoadingStatus(true));
        //function if api call is succes
        function saveDataTrue(isSuccess) {
          console.log(isSuccess);
          dispatch(saveNewDeadline(isSuccess));
          dispatch(setLoadingStatus(false));
        }
        //function if api call failed
        function saveDataFalse(error) {
          console.log(error);
          dispatch(setLoadingStatus(false));
          alert('Server Error, add deadline again');
        }
        api
          .updateTask(todoObject.id, { due_date: newDeadline })
          .then((isSuccess) => saveDataTrue(isSuccess))
          .catch((error) => saveDataFalse(error));
  }

  //searches for changes in deadline string until string matches requirements and saves the newDeadline
  useEffect(() => {
    //Check if the length of the string matches and isn't the same as the old newDeadline string
    if(newDeadline.length === 10 && newDeadline !== 'yyyy-mm-dd'){
      //check if theres a .due.date property if so is the newDeadline the same?
      if(todoObject.due !== null){
        if(todoObject.due.date === newDeadline){
          return
        }
      }
        //check if the string matches the pattern
        if(newDeadline.match(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/g)){
          console.log('het matched')
          //check if the month and day number aren't to big
          let month = Number(newDeadline[5] + newDeadline[6]);
          let day = Number(newDeadline[8] + newDeadline[9]);
          if(month < 13 || day < 31){
            //this function makes the api call and saves the new deadline
            saveDeadline()
            //dispatch(saveNewDeadline({ id: todoObject.id, content: todoObject.content, due: { date: newDeadline }, priority: 1, projectId: todoObject.projectId }));
          }else{
            alert('day or month input are to big')
          }
        }else{
          alert('deadline input does not match the pattern');
        }
    }
  }, [newDeadline]);


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
    <div id="deadline_desktop">
    <input type="text" name="deadline" value={newDeadline} onChange={trackNewDeadline}></input>
    <svg id='calendar_ico' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></svg>
    </div>
    <svg
      onClick={removeTask}
      className="task__trash-icon_desktop"
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
