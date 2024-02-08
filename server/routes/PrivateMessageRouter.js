// routes/privatemessagerouter.js
const express = require("express");
const PrivateMessage = require("../models/PrivateMessage");

const privateMessageRouter = express.Router();

// Route to send a private message
privateMessageRouter.post("/send", async (req, res) => {
  const { from_user, to_user, message } = req.body;

  try {
    // Create a new private message
    const newPrivateMessage = new PrivateMessage({
      from_user,
      to_user,
      message,
    });

    // Save the private message to the database
    await newPrivateMessage.save();

    res.status(201).json({ message: "Private message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get private messages between two users
privateMessageRouter.get("/get/:from_user/:to_user", async (req, res) => {
  const { from_user, to_user } = req.params;

  try {
    // Retrieve private messages between two users from the database
    const messages = await PrivateMessage.find({
      $or: [
        { from_user, to_user },
        { from_user: to_user, to_user: from_user },
      ],
    }).sort({ date_sent: 1 }); // Sorting by date_sent in ascending order

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = privateMessageRouter;
