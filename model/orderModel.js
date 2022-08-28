const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true,
            trim: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            trim: true,
            min: 1
        },
        _id: false
    }],
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
    },
}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema)