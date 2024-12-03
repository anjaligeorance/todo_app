import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Auth from "./components/Auth";
import TodoList from "./components/TodoList";
import SignUp from "./components/SignUp";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className="div1">
        {!loggedInUser ? (
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Auth setLoggedInUser={setLoggedInUser} />
                  <p>
                    Don’t have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        ) : (
          <>
            <button className="logout" onClick={handleLogout}>Logout</button>
            <TodoList user={loggedInUser} />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
