const express = require('express');
const app = express();
//var big_ml = require('./Bigml')
var { MongoClient } = require('mongodb');
var Kafka = require("node-rdkafka");
var { json } = require('body-parser');


var server = require('http').createServer(app);
const io = require("socket.io")(server);
const hostname = '127.0.0.1';
const port = 5000;

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

//-------MongoDB---------
const URI =
    "mongodb+srv://MyMongo:MyMongo@cluster0.nmvmu.mongodb.net/MyMongo?retryWrites=true&w=majority";
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
    console.log(JSON.parse(m.value.toString()));


});






/*

//-------Kafka---------
var Kafka = require("node-rdkafka");
var kafkaConf = {
    "group.id": "cloudkarafka-example",
    "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094".split(","),
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username": "g9we9ejd",
    "sasl.password": "HKGHAvtzzlOJuYcXVUPVJzlOmU5Xt1S-",
    "debug": "generic,broker,security"
};

const prefix = "g9we9ejd-";
const topics = [`${prefix}test`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});
const numMessages = 5;
let counter = 0;
consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});
consumer.on("data", function(m) {
  counter++;
  if (counter % numMessages === 0) {
    console.log("calling commit");
    consumer.commit(m);
  }

  const result = mongodb_cli.db("CallCenter").collection("calls").insertOne(JSON.parse(m.value.toString()));
  console.log(m.value.toString());
});


consumer.on("disconnected", function(arg) {
  process.exit();
});


consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});


consumer.on('event.log', function(log) {
  //console.log(log);
});
consumer.connect();

setTimeout(function() {
  consumer.disconnect();
}, 300000);

*/
