const { responseErrorJson, responseJson } = require('../utils/controllers-response');
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
    return responseJson(res, response);
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
module.exports = {
  get,
  getMyUser,
  login,
  post
};