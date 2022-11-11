const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT);
console.log("listening to port: ", PORT);

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("connected!: ", socket.id);

  socket.on("ready", () => {
    console.log("player ready", socket.id);

    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      io.emit("startGame", socket.id); //send information to all client connected
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData); //sed information to all client connected except the sender
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});
