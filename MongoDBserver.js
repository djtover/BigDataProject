const express = require('express');
const app = express();
var big_ml = require('./Bigml')
var { MongoClient } = require('mongodb');
var Kafka = require("node-rdkafka");
var { json } = require('body-parser');


var server = require('http').createServer(app);
const io = require("socket.io")(server);
const hostname = '127.0.0.1';
const port = 4000;

app.set('views', './Views');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get('/', (req, res) => res.send('<a href=/predict>Predict</a>'))

app.get('/predict', (req, res) => res.render('predict'));

io.on("connection", (socket) => {
    console.log("new user connected");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

});

const URI =
    "mongodb+srv://db:dbdb@cluster0.dmoln.mongodb.net/DB?retryWrites=true&w=majority";
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
    const result = mongodb_cli.db("CallCenter").collection("calls").insertOne(JSON.parse(m.value.toString()));
    console.log(m);


});


