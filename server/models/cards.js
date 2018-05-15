const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
  number: {
    type: Number,
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
  cvv: {
    type: Number,
    required: true,
    trim: true,
    minlength: 3
  },
  expirationDate: {
    type: Date,
    required: true,
    trim: true
  },
  limit: {
    type: Number
  },
  available: {
    type: Number
  }
});


const CardsModel = mongoose.model('Cards', CardsSchema);

module.exports = {CardsModel};
