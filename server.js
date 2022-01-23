const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const {userJoin, getCurrentUser, getRoomUsers} = require("./utils/users");

const app = require("express")();
const server = require("http").createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    // console.log("user connected");
    socket.on("joinRoom", ({username, room}) => {
        socket.emit("message", room);
        // console.log(username, room);
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
    });
    socket.on("taskDone", (currentUserId, taskText) => {
        const currentUser = getCurrentUser(currentUserId);
        currentUser.days += 1;
        const roomUsers = getRoomUsers(currentUser.room);
        io.to(currentUser.room).emit("updateChart", roomUsers, taskText);
    });
});






const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at port: ${PORT}`));