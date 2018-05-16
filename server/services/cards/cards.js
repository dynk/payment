const cryptoService = require('../crypto');

function encryptCard(cards){
  if(Array.isArray(cards)){
    return cards.map(encryptOne);
  }
  return encryptOne(cards);
  function encryptOne(card){
    card.number = cryptoService.encrypt(card.number);
    card.cvv =  cryptoService.encrypt(card.cvv);
    return card;
  }
}

function decryptCard(cards){
  if(Array.isArray(cards)){
    return cards.map(decryptOne);
  }
  return decryptOne(cards);
  function decryptOne(card){
    card.number = cryptoService.decrypt(card.number);
    card.cvv =  cryptoService.decrypt(card.cvv);
    return card;
  }
}

module.exports = {
  encryptCard,
  decryptCard
};