const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const Schema = mongoose.Schema

const occasionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Occasion', occasionSchema)
