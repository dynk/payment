const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Cards'
  }],
  limit: {
    type: Number,
    default: 0,
    min:0
  },
  available: {
    type: Number,
    default: 0,
    min:0
  }
});


const WalletsModel = mongoose.model('Wallets', WalletsSchema);

module.exports = {WalletsModel};
