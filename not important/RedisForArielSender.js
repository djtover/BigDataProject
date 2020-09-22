// הפעילו את 
// redis
// מתמונת דוקר הנמצאית כאן
// https://hub.docker.com/_/redis

var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
const { json } = require('body-parser');
var redisClient = redis.createClient();

//------------ kafka------------
// const kafka = require('./kafkaConsume');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//var sub = redis.createClient()

// for explanations : https://www.sitepoint.com/using-redis-node-js/

app.get('/our-test', function (req, res) {
    // Store string 
    console.log("tring to get something") 
    redisClient.set('CurrentNumberOfCalls', "90", function (err, reply) {
        console.log(reply);
        // redisClient.get('CurrentNumberOfCalls', function (err, object) {
       
        //     console.log(object);
        // })
    console.log("ok");
    });

    //Store and get Hash i.e. object( as keyvalue pairs)"
 
    redisClient.hmset('db', "id", "1598614932796", "city", "Jerusalem", "topic", "Medication", "language", "Hebrew", "gender", "Male", "age", "18");
    redisClient.hmset('db',"situation","Emergency","totalTime","1.22");
    redisClient.hgetall('db', function (err, object) {
       
        console.log(object);
        var jsonObject = JSON.stringify(object);
        console.log(jsonObject);

        redisClient.publish("message", jsonObject, function () {
        //process.exit(0); 
    });
    });
    
    /*
    also ok:
    redisClient.hmset('frameworks', {
                        'javascript': 'AngularJS',
                        'css': 'Bootstrap',
                        'node': 'Express'
                        });
    */

// lists : rpush or lpush
/* client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});

// -1= get all
client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
}); */



    // redisClient.publish("message", "{\"message\":\"Hello world !\"}", function () {
    //     //process.exit(0); 
    // });

    res.send('Hello World!')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
    console.log(`Server running at http://localhost:6062/`);
});
