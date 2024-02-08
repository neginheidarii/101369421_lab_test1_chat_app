// src/components/SignIn.js
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSignIn = () => {
    // In a real-world scenario, you would send the username and password to the backend for authentication
    // For simplicity, we'll compare them with hard-coded values here
    const validUsername = "user1"; // Replace with actual username validation
    const validPassword = "password123"; // Replace with actual password validation

    if (username === validUsername && password === validPassword) {
      // Successful sign-in
      history.push("/dashboard"); // Redirect to the dashboard or the desired route
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
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
      <button className="button" onClick={handleSignIn}>
        Sign In
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
