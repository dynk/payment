const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletsSchema = new mongoose.Schema({
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


const JobsModel = mongoose.model('Wallets', WalletsSchema);

module.exports = {JobsModel};
