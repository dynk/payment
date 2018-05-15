const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/wallets/wallets');
const { pick } = require('ramda');

async function get(req, res) {
  try{
    const response = await service.get(req);
    return responseJson(res, response);
  }catch(err){
    return responseErrorJson(res, 'wallets::get', err);
  }
}



async function destroy(req, res) {
  try{
    const response = await service.destroy(req);
    return responseJson(res, response.map(pick(['email', 'name'])));
  }catch(err){
    return responseErrorJson(res, 'wallets::delete', err);
  }
}


module.exports = {
  get,
  destroy
};