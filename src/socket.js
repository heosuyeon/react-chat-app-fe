import { io } from "socket.io-client";
console.log("process.env.NODE_ENV::::::::::::::::::", process.env.NODE_ENV);
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : process.env.REACT_APP_SOCKET_SERVER;
const socket = io(URL, {
  withCredentials: true,
});
export default socket;
