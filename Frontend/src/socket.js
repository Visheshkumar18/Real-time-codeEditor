import { io } from "socket.io-client";
const backendURL = import.meta.env.VITE_BACKEND_URL;
const socket = io(backendURL, {
  transports: ["websocket"], // faster / stable
  reconnection: true,
});

export default socket;
