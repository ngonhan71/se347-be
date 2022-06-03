const mongoose = require('mongoose')

const Schema = mongoose.Schema

const objectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Object', objectSchema)
