import io from "socket.io-client";

export default function initSocket() {
  const url = "http://localhost:3002";
  const socket = io(url, {
    transports: ["websocket"],
    path: "/chat",
    reconnection: true,
    reconnectionAttempts: Infinity,
    autoConnect: false,
  });
  return { socket };
}
