const mongoose = require("mongoose");

const GroupMessageScehma = new mongoose.Schema({
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

const GroupMessage = mongoose.model("GroupMessage", GroupMessageScehma);
module.exports = GroupMessage;
