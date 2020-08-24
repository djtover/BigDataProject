const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);

const hostname = '127.0.0.1';
const port = 3000;
app.set('views', './Views');
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', (req,res)=>res.send('<a href=/send>Send</a> <br/> <a href=/view>View</a> '))
app.get('/send', (req,res)=>res.render('sender'));
app.get('/view', (req,res)=>res.render('viewer'));

io.on("connection", (socket)=>{
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg)=>{console.log(msg.totalWaiting)});
    socket.on("callDetails",(msg)=>{console.log(msg)});
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

  });