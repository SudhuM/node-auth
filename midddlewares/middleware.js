const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwtHelper');
const User = require('../models/user');

exports.checkAuth = async (req, res, next) => {
	try {
		const { headers } = req;

		if (!headers.authorization) {
			throw createError.Unauthorized();
		}

		const { authorization } = headers;

		const token = authorization.split(' ')[1];

		if (!token) {
			throw createError.Unauthorized();
		}

		// TODO : invalidate token if user changes password after the token was issued

		const { payload } = await verifyToken(token);

		// get the user from the DB here
		const user = await User.findById(payload.id);

		req.user = user;

		next();
	} catch (error) {
		next(error);
	}
};

exports.validateBody = (schema) => {
	return async (req, res, next) => {
		try {
			const validatedResult = await schema.validateAsync(req.body);
			req.body = validatedResult;
			next();
		} catch (err) {
			// if (err.isJoi) {
			// 	err.status = 422;
			// }
			next(err);
		}
	};
};
