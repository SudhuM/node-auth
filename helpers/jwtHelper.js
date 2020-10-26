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
					return reject(err);
				}
				return resolve(token);
			}
		);
	});
};
