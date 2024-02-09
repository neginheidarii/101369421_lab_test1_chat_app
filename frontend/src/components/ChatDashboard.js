import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../io-socket";
import "./ChatDashboard.css"; // Import the external stylesheet

const ChatDashboard = () => {
  const nav = useNavigate();
  const [roomInfo, setRoomInfo] = useState({
    roomName: "Room 1",
    members: ["User1", "User2", "User3"],
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("User1");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");
      socket.send({
        room: roomInfo.roomName,
        username: currentUser,
        text: newMessage,
      });
    }
  };

  const leaveRoom = () => {
    // Implement your logic to leave the room
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      nav("/signin");
      return;
    }

    socket.on("message", (data) => {
      setMessages(data);
    });

    socket.connect();

    socket.emit("joinRoom", {
      username: user,
      room: roomInfo.roomName,
    });
  }, [roomInfo.roomName, nav]);

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>{roomInfo.roomName}</h2>
        <p>Members:</p>
        <ul>
          {roomInfo.members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <Link to="/join">
          <button className="join-button">Join Another Room</button>
        </Link>
        {/* <br /> */}
        <button className="leave-button" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>
      <div className="chat-area">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.username === currentUser ? "own-message" : "other-message"
              }
            >
              <strong>{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
