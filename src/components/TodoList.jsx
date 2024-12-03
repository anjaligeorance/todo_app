import React, { useState, useEffect } from "react";

const TodoList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks-${user}`)) || [];
    setTasks(savedTasks);
  }, [user]);

  const addTask = () => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
    setNewTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h2>{user}'s To-Do List</h2>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
