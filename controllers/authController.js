const User = require('../models/user');
const createError = require('http-errors');
const { signToken } = require('../helpers/jwtHelper');

exports.register = async (req, res, next) => {
	try {
		const userExist = await User.findOne({ email: req.body.email });

		if (userExist) {
			return next(createError.Conflict('User with that email already exists'));
		}
		const user = await User.create(req.body);

		const token = await signToken({ id: user._id });

		return res.status(200).json({
			data  : user,
			token
		});
	} catch (err) {
		next(err);
	}
};

exports.login = (req, res, next) => {
	res.send('login route');
};

exports.refreshToken = (req, res, next) => {
	res.send('refresh Token router');
};

exports.logout = (req, res, next) => {
	res.send('logout router');
};
