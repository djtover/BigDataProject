 //------------ kafka Producer------------
 const kafka = require('./kafkaproducer');
 const bodyParser = require('body-parser');


 //-----------express-----------------
 const express = require('express');
 const app = express();
 var server = require('http').createServer(app);
 const io = require("socket.io")(server);
 const hostname = '127.0.0.1';
 const port = 3000;
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.set('view engine', 'ejs');
 app.use(express.static("public"));
 app.get('/', (req,res)=>res.send('<a href=/send>Send</a> <br/> <a href=http://localhost:4000/view>View</a>  <br/> <a href=http://localhost:4500/predict>Prediction</a>'))
 app.get('/send', (req,res)=>res.render('sender'));
 app.get('/view', (req,res)=>res.render('viewer'));
 app.get('/predict', (req,res)=>res.render('predict'));
 const total  = 0 ;

 //~~~~~~~~redis~~~~~~~~~~~~~ 
 var redis = require('redis');
 const { Client } = require('node-rdkafka');
 var client2 = redis.createClient();
 client2.on('error', function (err) {
     console.log('Error ' + err);
 }); 
 
 client2.on('connect', function() {
     console.log('Connected to Redis');
 });

 
 //------------ Socket.io ----------------
 io.on("connection", (socket) => {
     console.log("new user connected");
     socket.on("totalWaitingCalls", (msg) => { console.log(msg.to)});
     socket.on("callDetails", (msg) => { kafka.publish(msg) 
     m=JSON.stringify(msg);
    });
 });
 server.listen(port, () => console.log(`app listening at http://localhost:${port}`));


//~~~~~~~??~~~~~~~~~
 var nd = new Date().setHours(23,59,59);
 var expire = Math.floor((nd-Date.now())/1000);


 


    //-----------Update the viewer-------------
    
    function UpdateViewer(){
      var city = [0,0,0];// ירושלים,תל אביב,באר שבע
      var topic = [0,0,0,0,0,0];   
      var language = [0,0,0,0,0];//hebrew,english,amharic,russian,arabic
      
      client2.keys("*", function(e, keys){
        if(e)console.log(e);
    
        keys.forEach(function (key) {
            client2.get(key, function (err, value) {
              if(value!=undefined )
              {
                  //console.log(value);
                  //console.log(JSON.parse(value).city)
                  var currentCity = JSON.parse(value).city;
                  if(currentCity!='Jerusalem') 
                  //console.log(currentCity)
                  var currentTopic = JSON.parse(value).topic;
                  var currentlanguage = JSON.parse(value).language;
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
                  
                  //currentCity
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