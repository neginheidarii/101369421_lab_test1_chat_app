// routes/groupmessagerouter.js
const express = require("express");
const Message = require("../models/Message");

const MessageRouter = express.Router();

// Route to send a group message
MessageRouter.post("/send", async (req, res) => {
  const { from_user, room, message } = req.body;

  try {
    // Create a new group message
    const newMessage = new Message({
      from_user,
      room,
      message,
    });

    // Save the group message to the database
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get  messages for a specific room
MessageRouter.get("/get/:room", async (req, res) => {
  const { room } = req.params;

  try {
    // Retrieve  messages for a specific room from the database
    const messages = await Message.find({ room }).sort({ date_sent: 1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = MessageRouter;
