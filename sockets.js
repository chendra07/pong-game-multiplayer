let readyPlayerCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    console.log("connected!: ", socket.id);

    socket.on("ready", () => {
      console.log("player ready", socket.id);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.emit("startGame", socket.id); //send information to all client connected
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData); //sed information to all client connected except the sender
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log("client: ", socket.id, "reason: ", reason);
    });
  });
}

module.exports = {
  listen,
};
