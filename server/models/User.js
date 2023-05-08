const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		select: false,
		set(val) {
			return require('bcryptjs').hashSync(val, 10)
		}
	},
	email: {
		type: String,
	},
	follow: {
		type: String
	},
	avator: {
		type: String	
	},
	birth: {
		type: Date,
	},
	sex: {
		type: String,
	},
	city: {
		type: String
	}
})

module.exports = mongoose.model('User', schema)