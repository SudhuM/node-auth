const mongoose = require('mongoose');
const app = require('./app');

// dotenv
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

console.log(MONGO_URI);
mongoose
	.connect(MONGO_URI, {
		useCreateIndex     : true,
		useUnifiedTopology : true,
		useFindAndModify   : false,
		useNewUrlParser    : true,
		dbName             : 'node_auth'
	})
	.then((connection) => {
		console.log(`DB connected to ${connection.connections[0]['$dbName']}`);
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

app.listen(PORT, () => {
	console.log('Server started on localhost ' + PORT);
});
