const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please tell us your product name']
    },
    description: {
        type: String,
        required: [true,'Please provide a product description']
    },
    price: {
        type: Number,
        required:[true, 'A product must have a price']
    },
    quantity: {
        type: Number,
        required:[true, 'A product must have a quantity']
    },
    category: {
        type: String,
        required: [true,'Please provide a product category']
    },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;