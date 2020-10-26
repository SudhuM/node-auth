const Joi = require('joi');

exports.signUpSchema = Joi.object({
	name            : Joi.string().required().min(5).trim(),
	email           : Joi.string().email().required().lowercase().trim(),
	password        : Joi.string().required().min(8),
	confirmPassword : Joi.string().required()
});

exports.loginSchema = Joi.object({
	email    : Joi.string().email().required().lowercase().trim(),
	password : Joi.string().required()
});
