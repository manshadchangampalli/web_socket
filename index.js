import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "node:http";

const __filename = fileURLToPath(
  import.meta?.url
);
const __dirname = dirname(__filename);
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(
    join(__dirname, "/index.html")
  );
});

io.on("connection", (socket) => {
  console.log(
    "this is the connection established"
  );
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
});

server.listen(8081, () => {
  console.log(
    "Server is running on port 8080"
  );
});
