const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for user identification
        required: true,
    },
    name: {
        type: String,
    },
    phone: {
        type: Number
    },
    adress: {
        type: String
    },
    date:{
        type:String
    },

    products: [{
        category: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        image: {
            type: String,

        },
        count: {
            type: Number,
            default: 1
        },
        status: {
            type: String,
            default: "Order Placed"
        },
    }]
})

module.exports = mongoose.model('Order', orderSchema);