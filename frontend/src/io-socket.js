import { io } from "socket.io-client";

const socket = io("localhost:3005", {
    autoConnect: false,
});

export default socket;
