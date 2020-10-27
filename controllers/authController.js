const User = require('../models/user');
const createError = require('http-errors');
const { signToken, signRefreshToken } = require('../helpers/jwtHelper');
const client = require('../helpers/initRedis');

exports.register = async (req, res, next) => {
	try {
		const userExist = await User.findOne({ email: req.body.email });

		if (userExist) {
			return next(createError.Conflict('User with that email already exists'));
		}
		const user = await User.create(req.body);

		const accessToken = await signToken(user._id);
		const refreshToken = await signRefreshToken(user._id);
		return res.status(200).json({
			accessToken,
			refreshToken
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

		const accessToken = await signToken(user._id);
		const refreshToken = await signRefreshToken(user._id);

		return res.status(200).json({
			accessToken,
			refreshToken
		});
	} catch (error) {
		next(error);
	}
};

exports.refreshToken = async (req, res, next) => {
	try {
		const { id } = req;

		const accessToken = await signToken(id);
		const refreshToken = await signRefreshToken(id);

		return res.status(200).json({
			accessToken,
			refreshToken
		});
	} catch (err) {
		next(err);
	}
};

exports.logout = async (req, res, next) => {
	try {
		const id = req.user._id.toString();

		client.del(id, (err, val) => {
			if (err) {
				console.log(err);
				return next(createError.InternalServerError());
			}
			if (!val) return next(createError.Unauthorized());

			return res.sendStatus(204);
		});
	} catch (err) {
		next(err);
	}
};
