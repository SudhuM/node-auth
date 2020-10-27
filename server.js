const mongoose = require('mongoose');
const app = require('./app');
// dotenv
require('dotenv').config();

const initMongo = require('./helpers/initMongo');
const redisClient = require('./helpers/initRedis');

const PORT = process.env.PORT || 8000;

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

initMongo(MONGO_URI, process.env.DB_NAME);

process.on('SIGINT', async () => {
	await mongoose.connection.close();
	redisClient.quit();
	process.exit(1);
});

app.listen(PORT, () => {
	console.log('Server started on localhost ' + PORT);
});
