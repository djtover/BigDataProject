const express = require('express');
const app = express();
var { MongoClient } = require('mongodb');
var Kafka = require("node-rdkafka");
var DataToCsv = require('./Machine_Learning/ConvertToCsv')
var bigml = require('bigml');
var model = new bigml.LocalModel('model/5f69bab695a9306a9e0020f2', new bigml.BigML("galhadida80", "33b1ef017b9bf25af4a2bb9c033613ed96afc479", {"domain": "bigml.io"}));


//create route to predict 
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get('/', (req,res)=>res.send('<a href=/predict>Predict</a>'))

app.get('/predict', (req, res) => res.render('predict'));


//create server 
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const hostname = '127.0.0.1';
const port = 4500;

io.on("connection", (socket) => {
   
    socket.on("MsgBigMl", (message) => {

        model.predict(message, function (error, data) {
               console.log(data["prediction"])
            socket.emit("predict", data["prediction"]);
            });       
    });
    
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

});


//create MongoDB connect via Kafka
const URI =
   "mongodb+srv://dbg:dbgdbg@cluster0.dmoln.mongodb.net/DB?retryWrites=true&w=majority";
const mongodb_cli = new MongoClient(URI);

mongodb_cli.connect();
console.log(`Connected to mongoDB`);

var consumer = new Kafka.createReadStream({
    'metadata.broker.list': 'kafka-gal-galhadida80-e0d0.aivencloud.com:27501',
    'group.id': 'demo-consumer-group',
    'security.protocol': 'ssl',
    'ssl.key.location': 'service.key',
    'ssl.certificate.location': 'service.cert',
    'ssl.ca.location': 'ca.pem'
}, {}, { 'topics': ['test'] });



consumer.on("ready", function (arg) {
    console.log(`Consumer kafka ready`);
    consumer.consume();
});

consumer.on("data", function (m) {
    mongodb_cli.db("CallCenter").collection("bigdata").insertOne(JSON.parse(m.value.toString()));
    msg = JSON.parse(m.value.toString());
    DataToCsv.write(m.value.toString());
    console.log(msg);


});

