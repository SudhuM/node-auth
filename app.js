const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const { errorHandler, notFoundHandler } = require('./errors/errorHandler');
const { checkAuth } = require('./midddlewares/middleware');
const app = express();

app.use(morgan('dev'));

app.use(helmet());

app.use(express.json());

app.get('/', checkAuth, (req, res, next) => {
	return res.send('Home page');
});

app.use('/auth', authRoutes);

// 404 handler
app.use(notFoundHandler);

// global error handler
app.use(errorHandler);

module.exports = app;
