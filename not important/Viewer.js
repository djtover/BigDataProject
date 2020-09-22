const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);


io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    socket.on("callDetails", (msg) => { console.log(msg);
        i++;
        var id = "id" + i;
        m=JSON.stringify(msg);
        rclient.hset(id, "msg", m);
        console.log("app.js...")
    });
});
