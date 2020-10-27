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

		const accessToken = await signToken({ id: user._id });

		return res.status(200).json({
			data        : user.modifyUserObject(),
			accessToken
		});
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user || !await user.validatePassword(password)) {
			return next(createError.Unauthorized('Incorrect Credentials'));
		}

		const accessToken = await signToken({ id: user._id });

		return res.status(200).json({
			accessToken
		});
	} catch (error) {
		next(error);
	}
};

exports.refreshToken = (req, res, next) => {
	res.send('refresh Token router');
};

exports.logout = (req, res, next) => {
	res.send('logout router');
};
