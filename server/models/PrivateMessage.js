const mongoose = require("mongoose");

const PrivateMessageScehma = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  from_user: {
    type: String,
  },
  room: {
    type: String,
  },
  message: {
    type: String,
  },

  date_sent: {
    type: Date,
    default: Date.now,
  },
});

const PrivateMessage = mongoose.model(
  "PrivateMessage",
  PrivateMessageScehma
);
module.exports = PrivateMessage;
