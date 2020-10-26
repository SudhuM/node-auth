const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
	if (this.isNew || this.isModified('password')) {
		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;

		next();
	}
	next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
