const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GoodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'good.png'
    },
});

const Good = mongoose.model('Good', GoodSchema);

module.exports = Good;