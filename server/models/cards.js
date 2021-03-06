const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
  // encrypted
  number: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  holder: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  // encrypted
  cvv: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  expirationDate: {
    type: Date,
    required: true,
    trim: true
  },
  payDay: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 2
  },
  limit: {
    type: Number,
    required: true,
    min:0
  },
  available: {
    type: Number,
    default: 0,
    min:0
  }
});


const CardsModel = mongoose.model('Cards', CardsSchema);

module.exports = {CardsModel};
