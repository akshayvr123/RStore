const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true,
    default:"https://www.shutterstock.com/image-photo/cucumber-slices-isolated-over-white-600nw-26951737.jpg "
  },
  // Embed products within the category
  products: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0.01
    },
    stock: {
      type: String,
      required: true,
      
    },
    images: [{
      type: String,
      trim: true
    }],
    // Add other relevant product fields
  }]
});

module.exports = mongoose.model('Product', productSchema);