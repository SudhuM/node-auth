const mongoose = require('mongoose');
const app = require('./app');
// dotenv
require('dotenv').config();

const initMongo = require('./helpers/_init_mongo');

const PORT = process.env.PORT || 8000;

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

initMongo(MONGO_URI, process.env.DB_NAME);

process.on('SIGINT', async () => {
	await mongoose.connection.close();
	process.exit(1);
});

app.listen(PORT, () => {
	console.log('Server started on localhost ' + PORT);
});
