const mongoose = require("mongoose");

const MessageScehma = new mongoose.Schema({
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

const Message = mongoose.model("Message", MessageScehma);
module.exports = Message;
