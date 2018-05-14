const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/users/users');
const { pick } = require('ramda');

async function get(req, res) {
  try{
    const response = await service.get(req);
    return responseJson(res, response.map(pick(['email', 'password'])));
  }catch(err){
    return responseErrorJson(res, 'users::get', err);
  }
}

async function post(req, res) {
  try{
    const response = await service.post(req);
    return res.json(response);
  }catch(e) {
    return res.status(500).json(e);
  }

}
module.exports = {
  get,
  post
};