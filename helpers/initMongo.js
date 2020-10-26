const mongoose = require('mongoose');

const initMongo = async (uri, dbName) => {
	try {
		const connection = await mongoose.connect(uri, {
			useCreateIndex     : true,
			useUnifiedTopology : true,
			useFindAndModify   : false,
			useNewUrlParser    : true,
			dbName
		});
		console.log(`Connected to DB ${connection.connections[0]['$dbName']}`);
	} catch (err) {
		console.log(err.message);
	}
};

mongoose.connection.on('connected', () => {
	console.log('DB connection successful');
});

mongoose.connection.on('error', (err) => {
	console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
	console.log('DB disconnected');
});

module.exports = initMongo;
