import "./todo-list.css";
import { useEffect, useState } from "react";
function ToDoList() {
  const [task, setTask] = useState(["eat", "sleep", "code"]);
  const [newTask, setnewTask] = useState("");
  const [isError, setIsError] = useState(false);
  const [isTop , setIsTop] = useState(false)
  const [isDown , setIsDown] = useState(false);
  function handelInputchange(event) {
    setnewTask(event.target.value);
  }
  const addTask = () => {
    if (newTask.trim() !== "") {
      setIsError(false);
      setTask([...task, newTask]);
      setnewTask("");
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    
    }
  };
  function deleteTask(index) {
    const updateTask = task.filter((_, i) => i !== index);
    setTask(updateTask);
  }
  function moveUp(index) {
    const updatedTask = [...task];
    if (index > 0) {
        setIsTop(false);
        [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index-1] ,updatedTask[index]]
        setTask(updatedTask);
    }
    else {
        setIsTop(true);
        setTimeout(() => {
            setIsTop(false);
        }, 2000);
    }
  }
  
  function moveDown(index) {
    const updatedTask = [...task];
    if (index < task.length -1){
        setIsDown(false);
        [updatedTask[index],updatedTask[index+1]]= [updatedTask[index+1], updatedTask[index]]
        setTask(updatedTask);
    }
    else {
        setIsDown(true);
        setTimeout(() => {
            setIsDown(false);
        }, 4000);
    }
  }
  return (
    <div className="to-doList">
      <h1>todo-List</h1>
      <input
        type="text"
        placeholder="Enter task here ...... "
        value={newTask}
        onChange={handelInputchange}
      />
      {isError && <p className="error">Please enter a task</p>}
      <button className="Add-button" onClick={addTask}>
        Add
      </button>
        {isTop && <p className="error">selected task already at the top</p>}
      <ol>
        {task.map((item, index) => {
          return (
            <li key={index}>
              {item}
              <button
                className="dustbin-icon"
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
              <button className="up-icon" onClick={() => moveUp(index)}>
                ⬆️
              </button>
              <button className="down-icon" onClick={()=> moveDown(index)}>
                ⬇️
              </button>
            </li>

);
})}
      </ol>
{isDown && <p className="error">selected task already at the bottom</p>}
      <button className="clear-button" onClick={() => setTask([])}>
      🚽
      </button>
    </div>
  );
}
export default ToDoList;
