// src/components/JoinRoom.js
import React, { useState } from "react";
import "./JoinRoom.css"; // Import the external stylesheet

const JoinRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleJoinRoom = () => {
    // Handle joining the room logic
  };

  return (
    <div className="container">
      <h1>Join Room</h1>
      <div className="form-group">
        <label className="label" htmlFor="roomDropdown">
          Select a Room
        </label>
        <select
          className="input"
          id="roomDropdown"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="" disabled>
            Choose a room
          </option>
          <option value="devops">DevOps</option>
          <option value="cloud">Cloud Computing</option>
          <option value="covid19">COVID-19</option>
          {/* Add more rooms as needed */}
        </select>
      </div>
      <button className="button" onClick={handleJoinRoom}>
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
