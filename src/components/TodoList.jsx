import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskTime, setTaskTime] = useState({ hours: "", minutes: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    task: "",
    time: { hours: "", minutes: "" },
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks-${user}`)) || [];
    setTasks(savedTasks);
  }, [user]);

  const addTask = () => {
    if (newTask.trim() === "") {
      setErrorMessage("Task cannot be empty");
      return;
    }
    if (!taskTime.hours && !taskTime.minutes) {
      setErrorMessage("Please set a time for the task");
      return;
    }

    const timeInSeconds =
      parseInt(taskTime.hours || 0) * 3600 + parseInt(taskTime.minutes || 0) * 60;

    const updatedTasks = [...tasks, { task: newTask, time: timeInSeconds }];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
    setNewTask("");
    setTaskTime({ hours: "", minutes: "" });
    setErrorMessage("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
  };

  const startEditTask = (index) => {
    const currentTask = tasks[index];
    const currentTime = currentTask.time;
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);

    setEditIndex(index);
    setEditTaskData({
      task: currentTask.task,
      time: { hours: hours.toString(), minutes: minutes.toString() },
    });
  };

  const saveEditedTask = () => {
    if (editTaskData.task.trim() === "") {
      setErrorMessage("Task cannot be empty");
      return;
    }

    const updatedTasks = [...tasks];
    const timeInSeconds =
      parseInt(editTaskData.time.hours || 0) * 3600 +
      parseInt(editTaskData.time.minutes || 0) * 60;

    updatedTasks[editIndex] = {
      task: editTaskData.task,
      time: timeInSeconds,
    };

    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user}`, JSON.stringify(updatedTasks));
    setEditTaskData({ task: "", time: { hours: "", minutes: "" } });
    setEditIndex(null);
    setErrorMessage("");
  };

  const handleCheckbox = (index) => {
    alert("You successfully completed the task!");
    deleteTask(index);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.time > 0 ? { ...task, time: task.time - 1 } : task
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <input
          type="number"
          placeholder="Hours"
          value={taskTime.hours}
          onChange={(e) => setTaskTime({ ...taskTime, hours: e.target.value })}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={taskTime.minutes}
          onChange={(e) => setTaskTime({ ...taskTime, minutes: e.target.value })}
        />
        <button onClick={addTask}>Add</button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox" onChange={() => handleCheckbox(index)} />
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTaskData.task}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, task: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Hours"
                  value={editTaskData.time.hours}
                  onChange={(e) =>
                    setEditTaskData({
                      ...editTaskData,
                      time: { ...editTaskData.time, hours: e.target.value },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Minutes"
                  value={editTaskData.time.minutes}
                  onChange={(e) =>
                    setEditTaskData({
                      ...editTaskData,
                      time: { ...editTaskData.time, minutes: e.target.value },
                    })
                  }
                />
                <button onClick={saveEditedTask}>Save</button>
              </div>
            ) : (
              <div>
                {task.task} - {formatTime(task.time)}
                <button
                  className="edit-btn"
                  onClick={() => startEditTask(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
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
