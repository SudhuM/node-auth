const jwt = require('jsonwebtoken');
const client = require('./initRedis');
const createError = require('http-errors');

exports.signToken = (id) => {
	return new Promise((resolve, reject) => {
		const options = {
			expiresIn : process.env.JWT_EXPIRES_IN
		};

		jwt.sign({ id }, process.env.JWT_ACCESS_SECRET_KEY, options, (err, token) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(token);
		});
	});
};

exports.verifyToken = (token, secret) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(decoded); // userId
		});
	});
};

exports.signRefreshToken = (id) => {
	return new Promise((resolve, reject) => {
		const options = {
			expiresIn : process.env.JWT_REFRESH_EXPIRES_IN
		};

		jwt.sign({ id }, process.env.JWT_REFRESH_SECRET_KEY, options, (err, token) => {
			if (err) {
				// console.log(err);
				return reject(err);
			}

			client.set(
				id.toString(),
				token.toString(),
				'EX',
				parseInt(process.env.REDIS_KEY_EXPIRES),
				(err) => {
					if (err) {
						// console.log(err.message);
						return reject(createError.InternalServerError());
					}
					return resolve(token);
				}
			);
		});
	});
};
