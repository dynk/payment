
const { UsersModel } = require('../../models/users');
const { WalletsModel } = require('../../models/wallets');
const { CardsModel } = require('../../models/cards');
const { pick } = require('ramda');
const { findMissingFields } = require('../../utils/utils');

function get() {
  return UsersModel.find();
}

async function getCards(req = {}) {
  const { user } = req;
  try{
    const wallet = await WalletsModel.findOne({user: user.id}).populate('cards');
    return wallet.cards;
  }catch(err){
    throw err;
  }
}

async function post(req = {}){

  const userBody = pick(['email', 'password', 'name','adminCode'], req.body);
  if(userBody.adminCode && (userBody.adminCode === 'secretadmincode123')){
    userBody.isAdmin = true;
  }
  const user = new UsersModel(userBody);
  try{
    await user.save();
    const token = await user.generateAuthToken();
    return {user, token};
  }catch(err){
    throw err;
  }
}

async function postCards(req = {}){

  const { user } = req;
  const { walletId } = req.params;
  const cardBody = pick(['number', 'holder', 'cvv','expirationDate','limit','payDay'], req.body);
  const card = new CardsModel(cardBody);
  try{
    await card.save();
    const wallet = await WalletsModel.findOne({_id: walletId});
    const walletAvailable = wallet.available + card.limit;
    const walletLimit = wallet.limit + card.limit;
    await WalletsModel.update({
      _id: walletId,
      user: user.id
    },
    {
      '$push' :{ 'cards' : card.id },
      limit: walletLimit,
      available: walletAvailable
    }
    );
    return card;
  }catch(err){
    throw err;
  }
}


async function postWallets(req = {}){
  const { user } = req;
  const wallet = new WalletsModel({user: user.id});
  try{
    await wallet.save();
    return wallet;
  }catch(err){
    throw err;
  }
}


async function login(req = {}){

  const requideFields = ['email', 'password'];
  const {body = {}} = req;
  try{
    const missingFields = findMissingFields(body, requideFields);
    if(missingFields && missingFields.length){
      throw new Error('missingFields');
    }
    const userBody = pick(requideFields, req.body);
    const user = await UsersModel.findByCredentials(userBody.email, userBody.password);
    const token = await user.generateAuthToken();
    return {token, user};
  }catch(err){
    throw err;
  }
}

module.exports = {
  get,
  getCards,
  login,
  post,
  postCards,
  postWallets
};