// routes/groupmessagerouter.js
const express = require("express");
const GroupMessage = require("../models/GroupMessage");

const groupMessageRouter = express.Router();

// Route to send a group message
groupMessageRouter.post("/send", async (req, res) => {
  const { from_user, room, message } = req.body;

  try {
    // Create a new group message
    const newGroupMessage = new GroupMessage({
      from_user,
      room,
      message,
    });

    // Save the group message to the database
    await newGroupMessage.save();

    res.status(201).json({ message: "Group message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get group messages for a specific room
groupMessageRouter.get("/get/:room", async (req, res) => {
  const { room } = req.params;

  try {
    // Retrieve group messages for a specific room from the database
    const messages = await GroupMessage.find({ room }).sort({ date_sent: 1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = groupMessageRouter;
