const http = require("http");
const io = require("socket.io");
const apiServer = require("./api.js");
require("dotenv").config();

const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const sockets = require("./sockets");

const PORT = 3000;

httpServer.listen(process.env.port || PORT);
console.log("listening to port: ", PORT);

sockets.listen(socketServer);
