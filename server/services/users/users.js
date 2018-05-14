
const {UsersModel} = require('../../models/users');
const { pick } = require('ramda');

function get() {
  return UsersModel.find();
}

async function post(req = {}){

  const userBody = pick(['email', 'password'], req.body);

  const user = new UsersModel(userBody);
  try{
    await user.save();
    const token = await user.generateAuthToken();
    return {user, token};
  }catch(err){
    throw err.message;
  }
}

module.exports = {
  get,
  post
};