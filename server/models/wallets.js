const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Cards'
  }]
});


const JobsModel = mongoose.model('Wallets', WalletsSchema);

module.exports = {JobsModel};
