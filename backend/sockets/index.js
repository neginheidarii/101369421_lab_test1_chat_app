const io = require("socket.io");

/**
 * @param {io.Server} io
 */
const socketLogic = (io) => {
    const rooms = new Map();
    
    io.on("connection", (socket) => {
        console.log("user connected")
        socket.on("joinRoom", ({ username, room }) => {
            console.log("joinRoom", username, room);

            if (!rooms.has(room)) {
                rooms.set(room, { users: new Set(), messages: [] });
            }

            rooms.get(room).users.add(username);
            socket.join(room);
            io.to(room).emit("userJoined", { username, room });
            
            socket.send(rooms.get(room).messages);
        });

        socket.on("leaveRoom", ({ username, room }) => {
            rooms.get(room).users.delete(username);
            socket.leave(room);
            io.to(room).emit("userLeft", { username, room });
        });

        socket.on("message", ({ room, username, text }) => {
            console.log("message received", room, username, text);

            const message = { username, text };
            rooms.get(room).messages.push(message);

            socket.send(rooms.get(room).messages);
        });
    });
};

module.exports = socketLogic;
