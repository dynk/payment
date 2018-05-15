const service = require('../../../services/wallets/wallets');
// const expect = require('expect');
const assert = require('assert');

// const wallet = {
//   cards:[
//     {
//       'available': 231,
//       'limit': 231,
//       'payDay': 1,
//     },
//     {
//       'available': 1000,
//       'limit': 1000,
//       'payDay': 3
//     },
//     {
//       'available': 900,
//       'limit': 900,
//       'payDay': 3
//     },
//     {
//       'available': 1000,
//       'limit': 1000,
//       'payDay': 2
//     }
//   ]
// };

describe('Wallets servicews', () => {

  describe('Is payable', () => {
    it('should be able to pay', () => {
      const wallet = {
        available: 1000
      };
      const amount = 900;
      service.isPayable(wallet, amount)
        .then(assert)
        .catch(()=>assert(false));
    });

    it('should be able to pay strict the same', () => {
      const wallet = {
        available: 1000
      };
      const amount = 900;
      service.isPayable(wallet, amount)
        .then(assert)
        .catch(()=>assert(false));
    });

    it('should NOT be able to pay', () => {
      const wallet = {
        available: 1000
      };
      const amount = 1200;
      service.isPayable(wallet, amount)
        .catch((err) => assert(err instanceof Error));
    });

    it('should order cards', () => {
      const wallet = {
        available: 1000
      };
      const amount = 1200;
      service.isPayable(wallet, amount)
        .catch((err) => assert(err instanceof Error));
    });

  });

});