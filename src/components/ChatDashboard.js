// src/components/ChatDashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ChatDashboard = () => {
  // Example state for room information, messages, and current user
  const [roomInfo, setRoomInfo] = useState({
    roomName: "Room 1",
    members: ["User1", "User2", "User3"],
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("User1"); // Change this based on your authentication

  // Function to handle sending a message
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { user: currentUser, text: newMessage }]);
      setNewMessage("");
    }
  };

  // Example function to leave the room
  const leaveRoom = () => {
    // Implement your logic to leave the room
  };

  useEffect(() => {
    // Example: Fetch messages from the server or socket connection
    // Replace this with your actual logic for fetching messages
    setMessages([
      { user: "User1", text: "Hello" },
      { user: "User2", text: "Hi there!" },
      // ... more messages
    ]);
  }, []); // Run this effect only once on component mount

  return (
    <div className="container">
      <div className="sidebar">
        <h2>{roomInfo.roomName}</h2>
        <p>Members:</p>
        <ul>
          {roomInfo.members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <Link to="/join">
          <button className="button">Join Another Room</button>
        </Link>
        <button className="button" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>
      <div className="chat-area">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.user === currentUser ? "own-message" : "other-message"
              }
            >
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
