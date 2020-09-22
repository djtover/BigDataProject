var redis = require('redis');
client = redis.createClient();

client.keys("*", function(e, keys){
    if(e)console.log(e);

    keys.forEach(function (key) {
        client.get(key, function (err, value) {
            console.log(value);
            try{
                if(JSON.parse(value).city!=undefined)
                console.log(JSON.parse(value).city)

            }
            catch(error){

            }
        });
    });
});