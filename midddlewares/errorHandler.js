const createError = require('http-errors');

exports.errorHandler = async (err, req, res, next) => {
	if (err.isJoi) {
		err.status = 422;
	}
	return res.status(err.status || 500).json({
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
