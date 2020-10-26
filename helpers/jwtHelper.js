const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.signToken = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET_KEY,
			{
				expiresIn : process.env.JWT_EXPIRES_IN
			},
			(err, token) => {
				if (err) {
					console.log(err);
					return reject(new createError.InternalServerError());
				}
				return resolve(token);
			}
		);
	});
};
