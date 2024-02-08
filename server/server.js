const express = require("express");
const mongoose = require("mongoose");
const http = require("http").createServer(express); // Create an HTTP server
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Import models from models folder
const User = require("./models/User");
const GroupMessage = require("./models/GroupMessage");
const PrivateMessage = require("./models/PrivateMessage");
const socketLogic = require("./sockets");
const socketIo = require("socket.io");
const UserRoutes = require("./routes/UserRoutes");
const privateMessageRouter = require("./routes/PrivateMessageRouter");
const groupMessageRouter = require("./routes/GroupMessageRouter");


const app = express();
app.use(express.json());
const SERVER_PORT = 3000;
const JWT_SECRET_KEY =
  "3f713a45f28f26dc30ba474d150fa1b6bc3c07b69048bb56358ddd8251523c1a";

const DB_CONNECTION_STRING =
  "mongodb+srv://neginDb:Nhd6710@cluster0.tgc1gdl.mongodb.net/chat_app?retryWrites=true&w=majority";

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(`Error while MongoDB connection ${err}`);
  });


// Create the HTTP server
const server = http.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

// Create the Socket.IO instance by passing the HTTP server
const io = socketIo(server);

// Initialize Socket.IO logic
socketLogic(io);

app.use(UserRoutes);
app.use(privateMessageRouter);
app.use(groupMessageRouter);


app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
