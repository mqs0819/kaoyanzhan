const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
	name: { type: String },
	body: { type: String },
}, {
	timestamps: true // 设置自动创建时间戳
})

module.exports = mongoose.model('College', schema)