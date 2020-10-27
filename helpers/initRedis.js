const redis = require('redis');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
	detect_buffers : true
});

// events
client.on('connect', () => {
	console.log('redis connected');
});
client.on('ready', () => {
	console.log('redis connection successful and is ready to use');
});

client.on('error', (error) => {
	console.log(error);
});

client.on('end', () => {
	console.log('redis connection ended');
});

module.exports = client;
