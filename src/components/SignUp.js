// src/components/SignUp.js
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSignUp = () => {
    // In a real-world scenario, you would send the new user's information to the backend for account creation
    // For simplicity, we'll just redirect to the sign-in page
    // In a real-world scenario, you would handle account creation with backend logic
    // For simplicity, we'll redirect to the sign-in page
    history.push("/signin");
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="form-group">
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleSignUp}>
        Sign Up
      </button>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
