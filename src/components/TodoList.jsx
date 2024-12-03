import React, { useState, useEffect } from "react";
import './TodoList.css';  

const TodoList = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState(""); 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks-${user}`)) || [];
    setTasks(savedTasks);
  }, [user]);

  const addTask = () => {
    if (newTask.trim() === "") {
      setErrorMessage("Input task"); 
      return;
    }

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
    setNewTask("");
    setErrorMessage(""); 
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
  };

  const startEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  const saveEditedTask = () => {
    if (editTask.trim() === "") {
      setErrorMessage("Task cannot be empty");
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editTask;
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
    setEditTask("");
    setEditIndex(null);
    setErrorMessage(""); 
  };

  return (
    <div className="todo-container">
      <h2>{user}'s To-Do List</h2>

      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add</button>
        
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={saveEditedTask}>Save</button>
              </div>
            ) : (
              <div>
                {task}
                <button className="edit-btn" onClick={() => startEditTask(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
