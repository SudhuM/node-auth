const { validationSchema } = require('../helpers/validationSchema');

exports.authBodyValidator = async (req, res, next) => {
	try {
		const { authSchema } = validationSchema;

		const validatedResult = await authSchema.validateAsync(req.body);

		req.body = validatedResult;
		next();
	} catch (err) {
		next(err);
	}
};
