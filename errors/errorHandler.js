const { HttpError } = require('http-errors');
const createError = require('http-errors');

exports.errorHandler = (err, req, res, next) => {
	// console.log(err);
	if (err.name === 'JsonWebTokenError') {
		err = createError.Unauthorized();
	} else if (err.name === 'TokenExpiredError') {
		err = createError.Unauthorized('Token expired');
	} else if (err.isJoi) {
		err.status = 422;
	} else if (err instanceof HttpError) {
		err = err;
	} else {
		err = createError.InternalServerError();
	}

	return res.status(err.status).json({
		error : {
			status : err.status || 500,
			error  : err.message
		}
	});
};

exports.notFoundHandler = async (req, res, next) => {
	const error = createError.NotFound();
	return next(error);
};
