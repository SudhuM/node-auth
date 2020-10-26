exports.register = (req, res, next) => {
	res.send('regsiter router');
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
