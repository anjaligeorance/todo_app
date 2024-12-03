import React, { useState } from "react";
import './App.css';

import Auth from "./components/Auth";
import TodoList from "./components/TodoList";


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <div>
      {!loggedInUser ? (
        <Auth setLoggedInUser={setLoggedInUser} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TodoList user={loggedInUser} />
        </>
      )}
    </div>
  );
};

export default App;
