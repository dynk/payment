const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const HttpStatus = require('http-status-codes');
const service = require('../services/users/users');
const { pick } = require('ramda');

async function get(req, res) {
  try{
    const response = await service.get(req);
    return responseJson(res, response.map(pick(['email', 'name'])));
  }catch(err){
    return responseErrorJson(res, 'users::get', err);
  }
}

function getMyUser(req, res){
  return responseJson(res, pick(['email', 'name'], req.user));
}

async function post(req, res) {
  try{
    const response = await service.post(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::get', err);
  }
}

async function login(req, res){
  try{
    const {user ,token} = await service.login(req);
    res.header('x-auth', token);
    return responseJson(res, pick(['email', 'name'], user));
  }catch(err) {
    return responseErrorJson(res, 'users::login', err);
  }
}

async function postCards(req, res){
  try{
    const response = await service.postCards(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::postCards', err);
  }
}

async function postWallets(req, res){
  try{
    const response = await service.postWallets(req);
    return responseJson(res, response, HttpStatus.CREATED);
  }catch(err) {
    return responseErrorJson(res, 'users::postWallets', err);
  }
}


async function getCards(req, res){
  try{
    const response = await service.getCards(req);
    return responseJson(res, response);
  }catch(err) {
    return responseErrorJson(res, 'users::get', err);
  }
}


module.exports = {
  get,
  getCards,
  getMyUser,
  login,
  post,
  postCards,
  postWallets
};