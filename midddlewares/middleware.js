const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwtHelper');
const client = require('../helpers/initRedis');
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
			throw createError.BadRequest('token is missing');
		}
		// verify the access token
		const { id } = await verifyToken(token, process.env.JWT_ACCESS_SECRET_KEY);

		// get the user from the DB here
		const user = await User.findById(id);

		req.user = user;

		next();
	} catch (error) {
		next(error);
	}
};

exports.validateRefreshToken = async (req, res, next) => {
	try {
		const token = req.body.refreshToken;

		if (!token) {
			throw createError.BadRequest();
		}
		const { id } = await verifyToken(token, process.env.JWT_REFRESH_SECRET_KEY);

		client.get(id, (err, redisRefreshToken) => {
			if (err) {
				console.log(err);
				throw createError.InternalServerError();
			}

			if (redisRefreshToken !== token) {
				return next(createError.Unauthorized());
			}
			req.id = id;
			next();
		});
	} catch (err) {
		next(err);
	}
};

exports.validateBody = (schema) => {
	return async (req, res, next) => {
		try {
			const validatedResult = await schema.validateAsync(req.body);
			req.body = validatedResult;
			next();
		} catch (err) {
			next(err);
		}
	};
};
