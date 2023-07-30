import React, { useState } from 'react';
import './App.css';

interface TodoList {
  id : number;
  task : string;
  completed : boolean;
}

function App() {

  const [task, setTask] = useState<string>("");
  const [completed, isCompleted] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoList[]>([]);

  const handleOnChange =  (e:React.ChangeEvent<HTMLInputElement>) => {
      setTask(e.target.value);
  }

  const handleAddTask = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (task.trim() != ''){
        const taskObj:TodoList = {
          "id" : Date.now(),
          "task" : task,
          "completed" : false,
        };
        setTodos([...todos, taskObj]);
        setTask("")
      }
  }

  const handleOnCheckChange = (index:number) => {
    const updatedTodos = todos.map((todo) => 
    todo.id === index?{...todo, completed : !todo.completed} : todo);
    setTodos(updatedTodos);
    console.log(todos);
  }

  const handleDeleteTask = (index:number) =>{
    const updatedTodos = todos.filter((todo) => todo.id != index);
    setTodos(updatedTodos);
  }

  const completeAllTasks = () => {
    setTodos(() => todos.map((todo) => ({...todo,completed:true})));
  }

  const deleteCompletedTasks = () => {
    setTodos(() => todos.filter((todo) => todo.completed !== true))
  } 
  return (
    <div className='container'>
        
        <div className='header'>
          <img src={require("./assets/to-do-list.png")} id="todoIcon"></img>
          <h1>Todo List</h1>
        </div>

        <form className="formInput">
          <input type="text" 
          placeholder='Enter the task...'
          className='inputField'
          value={task}
          onChange={handleOnChange}/>
          <button className='btn' onClick={handleAddTask}>Add</button>
        </form>

        <div className='actionBar'>
          <div className='actionSection' onClick={completeAllTasks}>
            <img src={require("./assets/tick.png")} className='actionIcon'/>
            <p className='actionLabel'>Complete all tasks</p>       
          </div>

          <div className='actionSection' onClick={deleteCompletedTasks}>
            <img src={require("./assets/delete.png")} className='actionIcon'/>
            <p className='actionLabel'>Delete Comp Task</p>
          </div>
        </div>

        <div className='taskContainer'>
            {todos.map((t, index) => (

            <div className='taskList'>
              <div style={{display:'flex',alignItems:'center'}}>
                <input type='checkbox'  onChange={() => handleOnCheckChange(t.id)} className='chkBx' checked={t.completed}/>
                <label>{t.task}</label>
              </div>

              <div className='chkTile'>
                <img src={require("./assets/edit.png")} className='taskIcon' />
                <img src={require("./assets/delete.png")} className='taskIcon' onClick={() => handleDeleteTask(t.id)}/>
              </div>
            </div>))}
            
        </div>
    </div>
  );
}

export default App;
