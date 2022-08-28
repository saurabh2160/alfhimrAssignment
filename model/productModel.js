const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number, 
            required: true,
            trim: true
        },
        specifications: {
            type: String,
            required: true,
            trim: true
        }
    }, { timestamps: true })


module.exports = mongoose.model('Product', productSchema)