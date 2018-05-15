
const { WalletsModel } = require('../../models/wallets');
const moment = require('moment');
const R = require('ramda');

function get() {
  return WalletsModel.find();
}

async function post(req = {}){
  const walletBody = {
    user: req.body.userId
  };
  const wallet = new WalletsModel(walletBody);
  try{
    await wallet.save();
    return wallet;
  }catch(err){
    throw err.message;
  }
}



function destroy(req = {}){
  return WalletsModel.findByIdAndDelete(req.params.id);
}

function pay({wallet , amount}){
  return new Promise((resolve, reject) =>{
    return isPayable({wallet,amount})
      .then(selectAndOrderCardsWithLimit)
      .then((ordCards) => selectAndDistributePayCards(ordCards,amount))
      .then((payCards) => savePayment({wallet, payCards, amount}) )
      // .then(selectCardsWithLimit)
      .then(resolve)
      .catch(reject);

  });
  // if(isPayable(wallet)){
  //   return Promise.resolve(true);
  // }
  // return Promise.reject(new RangeError('Insuficient funds!'));
}

function isPayable({wallet , amount}){
  if(wallet.available > amount){
    return Promise.resolve(wallet);
  }
  return Promise.reject(new RangeError('Insuficient funds!'));
}

function selectAndOrderCardsWithLimit(wallet){
  const { cards } = wallet;
  const filter = (cards) => cards.filter(card => card.available > 0);
  // return filter(cards);
  if(!cards || !cards.length){
    return Promise.reject(new Error('Cards not found!'));
  }
  return R.compose(filter,orderCards)(cards);
}

function selectAndDistributePayCards(cards, amount){
  const result = [];
  for(const card of cards){
    if(amount <= 0){
      return result;
    }
    if(card.available > amount){
      card.available -= amount;
      amount = 0;
    }else{
      amount -= card.available;
      card.available = 0;
    }
    result.push(card);
  }
  return result;
}

function orderCards(cards){
  // const { cards } = wallet;
  let todayDate = moment().date();
  todayDate = 2;
  const dateAndLimitsort = R.sortWith([
    R.ascend(R.prop('limit')),
    R.descend(R.prop('dueDate'))
  ]);
  for(const card of cards){
    if(card.payDay > todayDate){
      card.dueDate = 31 - (todayDate - card.payDay);
    }else{
      card.dueDate = card.payDay - todayDate;
    }
  }
  return dateAndLimitsort(cards);
}

function savePayment({wallet, payCards, amount}){
  wallet.available -= amount;
  return wallet.save()
    .then(() => Promise.all(payCards.map(c => c.save())));
  // return Promise.all(payCards.map(c => c.save));
}


module.exports = {
  destroy,
  get,
  pay,
  post,
  isPayable,
  orderCards
};