const Joi = require('joi');

const authSchema = Joi.object({
	name            : Joi.string().required().min(5).trim(),
	email           : Joi.string().email().required().lowercase().trim(),
	password        : Joi.string().required().min(8),
	confirmPassword : Joi.string().required()
});

module.exports.validationSchema = {
	authSchema
};
