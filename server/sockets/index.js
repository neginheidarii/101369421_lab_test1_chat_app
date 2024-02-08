// sockets/index.js
const socketLogic = (io) => {
  // Map to store room information
  const rooms = new Map();

  // Socket.IO event for when a user joins a room
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      // Create or get the room
      if (!rooms.has(room)) {
        rooms.set(room, { users: new Set(), messages: [] });
      }

      // Add the user to the room
      rooms.get(room).users.add(username);

      // Join the room
      socket.join(room);

      // Broadcast to all users in the room that a new user has joined
      io.to(room).emit("userJoined", { username, room });

      // Send existing messages to the user who joined
      socket.emit("loadMessages", rooms.get(room).messages);
    });

    // Socket.IO event for when a user leaves a room
    socket.on("leaveRoom", ({ username, room }) => {
      // Remove the user from the room
      rooms.get(room).users.delete(username);

      // Leave the room
      socket.leave(room);

      // Broadcast to all users in the room that a user has left
      io.to(room).emit("userLeft", { username, room });
    });

    // Additional logic for handling messages and "user is typing..." can be added here
  });
};

module.exports = socketLogic;
