const validateBody = (schema) => {
	return async (req, res, next) => {
		try {
			const validatedResult = await schema.validateAsync(req.body);
			req.body = validatedResult;
			next();
		} catch (err) {
			next(err);
		}
	};
};

module.exports = validateBody;
