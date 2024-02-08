// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatDashboard from "./components/ChatDashboard";
import JoinRoom from "./components/JoinRoom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={ChatDashboard} />
          <Route path="/join" component={JoinRoom} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
