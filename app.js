const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use('/auth', authRoutes);

app.use((req, res, next) => {
	next(createError.NotFound());
});
// global error handler
app.use((err, req, res, next) => {
	return res.status(err.status || 500).json({
		error : {
			status : err.status || 500,
			error  : err.message
		}
	});
});

module.exports = app;
