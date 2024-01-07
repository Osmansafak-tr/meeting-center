require("dotenv").config();
const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (user, message, room) => {
    console.log(`Message from socket ${socket.id} : ${message}, room: ${room}`);
    if (room) {
      socket.to(room).emit("receive-message", user, message);
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    // cb(`Joined room ${room}`);
  });
});
