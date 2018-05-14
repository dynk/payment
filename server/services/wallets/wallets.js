
const {WalletsModel} = require('../../models/users');
// const { pick } = require('ramda');
// const { findMissingFields } = require('../../utils/utils');

function get() {
  return WalletsModel.find();
}

async function post(req = {}){

  const walletBody = {
    user: req.body.userId
  };

  const wallet = new WalletsModel(walletBody);
  try{
    await wallet.save();
    return wallet;
  }catch(err){
    throw err.message;
  }
}

module.exports = {
  get,
  post
};