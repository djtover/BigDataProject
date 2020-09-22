

//-------Socket IO---------
const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const hostname = '127.0.0.1';
const port = 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
//app.get('/', (req,res)=>res.send('<a href=/send>Send</a> <br/> <a href=/view>View</a> '))
app.get('/send', (req,res)=>res.render('sender'));
app.get('/view', (req,res)=>res.render('viewer'));

//-------Redis---------
var redis = require('redis');
var client = redis.createClient();


//~~~~~~~Set Duration~~~~~~~~~
var nd = new Date().setHours(23,59,59);
var expire = Math.floor((nd-Date.now())/1000);

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
  console.log(m.value.toString());
  //Save data in redis
  client.set(JSON.parse(m.value.toString()).id , m.value.toString() ,'EX' , expire)
  //Update the view
  UpdateViewer()
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
var Kafka = require("node-rdkafka");
var consumer = new Kafka.createReadStream({
  'metadata.broker.list': 'kafka-gal-galhadida80-e0d0.aivencloud.com:27501',
  'group.id': 'demo-consumer-group',
  'security.protocol': 'ssl',
  'ssl.key.location': 'service.key',
  'ssl.certificate.location': 'service.cert',
  'ssl.ca.location': 'ca.pem'
}, {}, { 'topics': ['test'] });


const numMessages = 5;
let counter = 0;
consumer.on("ready", function (arg) {
  console.log(`Consumer kafka ready`);
  consumer.consume();
});

consumer.on("data", function (m) {
  counter++;
  if (counter % numMessages === 0) {
    console.log("calling commit");
    try{
    consumer.commit(m);
    }
    catch(err){}
  }
  console.log(m.value.toString());
  //Save data in redis
  client.set(JSON.parse(m.value.toString()).id , m.value.toString() ,'EX' , expire)
  //Update the view
  UpdateViewer()

});






//-----------Update the viewer-------------
    
 function UpdateViewer(){
   var city = [0,0,0];// ירושלים,תל אביב,באר שבע
   var topic = [0,0,0,0,0,0];   
   var language = [0,0,0,0,0];//hebrew,english,amharic,russian,arabic
   var gender=[0,0];//Male,Female
   
   client.keys("*", function(e, keys){
     if(e)console.log(e);
 
     keys.forEach(function (key) {
         client.get(key, function (err, value) {
           if(value!=undefined )
           {
               //console.log(value);
               //console.log(JSON.parse(value).city)
               var currentCity = JSON.parse(value).city;
               //if(currentCity!='Jerusalem') 
               //console.log(currentCity)
               var currentGender= JSON.parse(value).gender;
               var currentTopic = JSON.parse(value).topic;
               var currentlanguage = JSON.parse(value).language;
               //Gender querry
               if (currentGender == "Male")
               {
                gender[0]++;
                io.emit('toclient' , gender );
               }
               if(currentGender == "Female")
               {
                gender[1]++;
                io.emit('toclient' , gender );
               }
               //Language query:
               if(currentlanguage == "Hebrew"){
                   language[0]++;
                   io.emit('toclient4' , language );
                }
                if(currentlanguage == "English"){
                    language[1]++;
                    io.emit('toclient4' , language );
                 }
                 if(currentlanguage == "Amharic"){
                    language[2]++;
                    io.emit('toclient4' , language );
                 }
                 if(currentlanguage == "Russian"){
                    language[3]++;
                    io.emit('toclient4' , language );
                 }
                 if(currentlanguage == "arabic"){
                     language[4]++;
                     io.emit('toclient4' , language );
                  }
   
               //topic
               if(currentTopic == "Medication"){
                   topic[0]++;
                   io.emit('toclient3' , topic );
                }
                 if(currentTopic == "Food"){
                    topic[1]++;
                    io.emit('toclient3' , topic );
                 }
                 if(currentTopic == "Water"){
                    topic[2]++;
                    io.emit('toclient3' , topic );
                 }
                 if(currentTopic == "Protection"){
                     topic[3]++;
                     io.emit('toclient3' , topic );
                  }
                  if(currentTopic == "Information"){
                     topic[4]++;
                     io.emit('toclient3' , topic );
                  }
                  if(currentTopic == "Evacuation"){
                    topic[5]++;
                    io.emit('toclient3' , topic);
                 }
               
               //City
               if(currentCity == "Jerusalem"){
                  city[0]++;
                  io.emit('toclient2' , city );
               }
                if(currentCity == "Tel Aviv"){
                   city[1]++;
                   io.emit('toclient2' , city );
                }
                 if(currentCity == "Beer Sheva"){
                   city[2]++;
                   io.emit('toclient2' , city );
                }

           }
         });
     });
 });
}
server.listen(port, () => console.log(`app listening at http://localhost:${port}`))