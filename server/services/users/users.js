
const { UsersModel } = require('../../models/users');
const { WalletsModel } = require('../../models/wallets');
const { pick } = require('ramda');
const { findMissingFields } = require('../../utils/utils');

function get() {
  return UsersModel.find();
}

async function post(req = {}){

  const userBody = pick(['email', 'password', 'name','adminCode'], req.body);
  if(userBody.adminCode && (userBody.adminCode === 'secretadmincode123')){
    userBody.isAdmin = true;
  }
  const user = new UsersModel(userBody);
  try{
    await user.save();
    const wallet = new WalletsModel({user: user.id});
    await wallet.save();
    const token = await user.generateAuthToken();
    return {user, token};
  }catch(err){
    throw err.message;
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
    return Promise.reject(err);
  }
}

module.exports = {
  get,
  login,
  post
};