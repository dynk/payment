
const { WalletsModel } = require('../../models/wallets');
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



function destroy(req = {}){
  return WalletsModel.findByIdAndDelete(req.params.id);
}

module.exports = {
  destroy,
  get,
  post
};