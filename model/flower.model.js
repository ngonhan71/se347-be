const mongoose = require('mongoose')

const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const Schema = mongoose.Schema

const flowerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    flowertype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flowertype'
    },
    occasion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Occasion'
    },
    object: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Object'
    },
    display: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    discount:  { type: Number, default: 0 },
    imageUrl: { type: String, default: 'https://shophoa.shop/media/shops/300x400x1-3e4680995411af4ff600.jpg'}
  
}, {
    timestamps: true
})


module.exports = mongoose.model('Flower', flowerSchema)
