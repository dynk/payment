
const { UsersModel } = require('../../models/users');
const { WalletsModel } = require('../../models/wallets');
const { CardsModel } = require('../../models/cards');
const { pick } = require('ramda');
const { findMissingFields } = require('../../utils/utils');
const serviceWallet = require('../wallets/wallets');

function get() {
  return UsersModel.find();
}

function getWallets(req = {}) {
  const { user } = req;
  return WalletsModel.find({user: user.id});
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


async function pay(req = {}){
  const options = {
    _id: req.params.walletId,
    user: req.params.id
  };
  const { amount } = req.body;
  const wallet = await WalletsModel.findOne(options).populate('cards');
  return serviceWallet.pay({wallet, amount});
  // return serviceWallet.selectCardsWithLimit(wallet);
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
  cardBody.available = cardBody.limit;
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
  getWallets,
  login,
  pay,
  post,
  postCards,
  postWallets
};