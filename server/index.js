const express = require("express");

const app = express();

require("dotenv").config();

const PORT = 4000;

// make an http server

const http = require("http").Server(app);

const cors = require("cors");

// importing mongoose

const connect = require("./Database/db");
connect();

// middlewear
app.use(cors());
app.use(express.json());

// router
const route = require("./Routes/userRoute");
const messageRoute = require("./Routes/messageRoute");

// routes
app.use("/api/v1/user", route);
app.use("/api/v1/message", messageRoute);

// adding socket io

const socketIo = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// start the server

socketIo.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

http.listen(PORT, async () => {
  console.log(`Server is runing on PORT ${PORT}`);
});
