const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	logoUrl: { type: String },
	address: { type: String },
	tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
	affiliated: { type: String }, // 隶属
	official_website: { type: String },
	speciality: [ {type: Array}]
})

module.exports = mongoose.model('School', schema)