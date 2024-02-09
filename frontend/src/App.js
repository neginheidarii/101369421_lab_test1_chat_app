// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatDashboard from "./components/ChatDashboard";
import JoinRoom from "./components/JoinRoom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<ChatDashboard />} />
                    <Route path="/join" element={<JoinRoom />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
