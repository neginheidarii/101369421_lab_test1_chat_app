const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const socketLogic = require("./sockets");
const UserRouter = require("./routes/UserRouter");
const MessageRouter = require("./routes/MessageRouter");

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.json());

const SERVER_PORT = 3005;
// const JWT_SECRET_KEY =
//     "3f713a45f28f26dc30ba474d150fa1b6bc3c07b69048bb56358ddd8251523c1a";

const DB_CONNECTION_STRING =
    "mongodb+srv://neginDb:Nhd67100@cluster0.tgc1gdl.mongodb.net/chat_app?retryWrites=true&w=majority";

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
        process.exit(1);
    });

// Initialize Socket.IO logic
socketLogic(io);

app.use(cors());
app.use(UserRouter);
app.use(MessageRouter);

// Create the HTTP server
server.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
