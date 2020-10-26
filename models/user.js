const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name     : {
		type      : String,
		required  : true,
		minlength : 5
	},
	email    : {
		type      : String,
		required  : true,
		unique    : true,
		lowercase : true
	},
	password : {
		type      : String,
		required  : true,
		minlength : 8
	}
});

const User = mongoose.model('user', userSchema);

module.exports = User;
