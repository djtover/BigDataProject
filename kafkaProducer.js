var Kafka = require('node-rdkafka');
console.log(Kafka.features); // this should print 'ssl', among other things
console.log('');

var producer = new Kafka.Producer({
    'metadata.broker.list': 'kafka-gal-galhadida80-e0d0.aivencloud.com:27501',
    'security.protocol': 'ssl',
    'ssl.key.location': 'service.key',
    'ssl.certificate.location': 'service.cert',
    'ssl.ca.location': 'ca.pem',
    'dr_cb': true
});

producer.connect();
producer.on('ready', function () {
    
    console.log('server is ready');

  
});

module.exports.publish = function (msg) {
    m = JSON.stringify(msg);
    producer.produce(
        'test',  // topic to send the message to
        null,  // partition, null for librdkafka default partitioner
        new Buffer(m),  // value
        null,  // optional key
        Date.now()  // optional timestamp
    );
    console.log('Message sent successfully');

    //producer.disconnect();   
}
