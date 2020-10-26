const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');
// dotenv
require('dotenv').config();

const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('tiny'));
app.use(helmet());

app.use('/auth', authRoutes);

// global error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error : {
			status : err.status || 500,
			error  : err.message
		}
	});
});

app.listen(PORT, () => {
	console.log('Server started on localhost ' + PORT);
});
