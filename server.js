const http = require("http");
const io = require("socket.io");
const apiServer = require("./api.js");
const sockets = require("./sockets");
require("dotenv").config();

const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

httpServer.listen(process.env.PORT || PORT);
console.log("listening to port: ", PORT);

sockets.listen(socketServer);
