const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema(
	{
		name            : {
			type      : String,
			required  : true,
			minlength : 5
		},
		email           : {
			type      : String,
			required  : true,
			unique    : true,
			lowercase : true
		},
		password        : {
			type      : String,
			required  : true,
			minlength : 8
		},
		// a temp field which will not be stored
		confirmPassword : {
			type : String
		}
	},
	{ timestamps: true }
);

userSchema.pre('save', function(next) {
	if (this.isNew || this.isModified('password')) {
		if (!validator.equals(this.password, this.confirmPassword)) {
			const error = new Error('Passwords did not match');
			error.status = 422;
			return next(error);
		}
		this.confirmPassword = undefined;
		next();
	}
});

userSchema.pre('save', async function(next) {
	if (this.isNew || this.isModified('password')) {
		const salt = await bcrypt.genSalt(12);

		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;

		next();
	}
	next();
});

userSchema.post('save', function(err, doc, next) {
	next(err);
});

const User = mongoose.model('user', userSchema);

module.exports = User;
