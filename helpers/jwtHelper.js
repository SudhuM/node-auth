const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.signToken = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				payload
			},
			process.env.JWT_ACCESS_SECRET_KEY,
			{
				expiresIn : process.env.JWT_EXPIRES_IN
			},
			(err, token) => {
				if (err) {
					console.log(err);
					return reject(err);
				}
				return resolve(token);
			}
		);
	});
};

exports.verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, decoded) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(decoded);
		});
	});
};
