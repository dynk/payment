const crypto = require('crypto');
const algorithm = 'aes-128-cbc';
const password = 'payment123321';

function encrypt(data){
  const cipher = crypto.createCipher(algorithm, password);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedData){
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(encryptedData, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;

}



module.exports = {
  encrypt,
  decrypt
};