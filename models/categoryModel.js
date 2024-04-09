const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {type: String, required: true},
    description: String
}, {versionKey: false});

categorySchema.virtual('url').get(function() {
    return `/category/${this._id}`
})

module.exports = mongoose.model('categories', categorySchema);