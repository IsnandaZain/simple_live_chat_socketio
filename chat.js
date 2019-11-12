const express = require("express");
const socketio = require("socket.io");

const app = express();
const expressServer = app.listen(8000);

app.use(express.static(__dirname + "/public"));

const io = socketio(expressServer);

io.on("connection", (socket) => {
    socket.on("fromClientPublic", (msg) => {
        console.log(msg)
    })
    socket.emit("toClientPublic", {data: "This message from server"})
    socket.on("newMessageToServer", (msg) => {
        io.emit("messageToClient", {text: msg.text})
    })
})