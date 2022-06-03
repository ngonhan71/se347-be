const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    service: { type: String }, // Google, Facebook
    serviceId: { type: String }, //userId Google || Facebook
    password: { type: String },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: { type: String },
    avatar: { type: String, default: 'https://res.cloudinary.com/dbynglvwk/image/upload/v1650182653/NHANLAPTOP/istockphoto-666545204-612x612_yu3gcq.jpg' },
    address: { type: String },
    codeToResetPassword: { type: String },
    role: { type: Number, default: 0 }
  
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)
