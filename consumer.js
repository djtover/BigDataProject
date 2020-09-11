var Kafka = require('node-rdkafka');

var stream = new Kafka.createReadStream({
    'metadata.broker.list': 'kafka-gal-galhadida80-e0d0.aivencloud.com:27501',
    'group.id': 'demo-consumer-group',
    'security.protocol': 'ssl',
    'ssl.key.location': 'service.key',
    'ssl.certificate.location': 'service.cert',
    'ssl.ca.location': 'ca.pem'
}, {}, { 'topics': ['test'] });

stream.on('data', function (message) {
    console.log('Got message');
    console.log(message.value.toString());
});