var redis = require('redis'); // added this
var rclient = redis.createClient();
var server = require('http').createServer(app);
const io = require("socket.io")(server);

rclient.on('connect', function(){
    console.log('Connected to Redis...');
  });

// var i=0;
// module.exports.publish= function(msg)
// {   
//   i++;
//   var id = "id" + i;
//   m=JSON.stringify(msg);
//   rclient.hset(id, "msg", m);
//   rclient.hget(id, "msg", function (err, obj) {
//     console.log(obj);
//  });
// }