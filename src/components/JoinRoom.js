// src/components/JoinRoom.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const JoinRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const history = useHistory();

  const handleJoinRoom = () => {
    // In a real-world scenario, you might want to handle joining the room with backend logic
    // For simplicity, we'll just redirect to the chat dashboard
    history.push("/dashboard");
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
