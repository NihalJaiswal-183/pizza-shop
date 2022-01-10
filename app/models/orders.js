const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pizzaUser',
        required: true
    },
    items: { type: Object, required: true },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        default:'COD',
    },
    status: {
        type: String,
        default:'send',
    }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
