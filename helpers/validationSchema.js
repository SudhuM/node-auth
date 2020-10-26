const Joi = require('joi');

const authSchema = Joi.object({
	name     : Joi.string().required().min(5),
	email    : Joi.string().email().required().lowercase(),
	password : Joi.string().required().min(8)
});

module.exports.validationSchema = {
	authSchema
};
