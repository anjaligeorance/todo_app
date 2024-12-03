import React, { useState } from "react";

const Auth = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
      alert("User already exists. Please sign in.");
      return;
    }
    users[email] = { password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign-up successful! Please sign in.");
  };

  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email] && users[email].password === password) {
      localStorage.setItem("loggedInUser", email);
      setLoggedInUser(email);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Auth;
