const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
	title: { type: String },
	body: { type: String },
}, { 
	timestamps: true // 设置自动创建时间戳
}) 

module.exports = mongoose.model('Article', schema)
