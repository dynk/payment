const service = require('../../../services/wallets/wallets');
// const expect = require('expect');
const assert = require('assert');

describe('Wallets servicews', () => {

  describe('Is payable', () => {
    it('should be able to pay', () => {
      const wallet = {
        available: 1000
      };
      const amount = 900;
      service.isPayable(wallet, amount)
        .then(assert)
        .catch(assert);
    });

    it('should NOT be able to pay', () => {
      const wallet = {
        available: 1000
      };
      const amount = 1200;
      service.isPayable(wallet, amount)
        .catch((err) => assert(err instanceof Error));
    });

  });

});