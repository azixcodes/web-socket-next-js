import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors"; // Import the CORS middleware

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT"],
  },
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-origin", "*");
  req.header(
    "Acess-Control-Allow-Headers",
    "Origin, X-Requested-Width,Content-Type, Accept"
  );
  next();
});

const PORT = 5000;
let users = 0;
// Use CORS middleware

io.on("connection", (socket) => {
  io.emit("new user joined");
  users++;
  console.log("new user connected");

  socket.on("users", () => {
    io.emit("users", users);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
