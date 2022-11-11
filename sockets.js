let readyPlayerCount = 0;

function listen(io) {
  const pongNameSpace = io.of("/pong");
  pongNameSpace.on("connection", (socket) => {
    let room;
    console.log("connected!: ", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log("player ready", socket.id);
      console.log("room: ", room);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        pongNameSpace.in(room).emit("startGame", socket.id); //send information to all client connected inside the room
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.to(room).emit("paddleMove", paddleData); //send information to all client connected except the sender inside the room
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log("client: ", socket.id, "reason: ", reason);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
