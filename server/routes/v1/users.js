const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const {authenticate, isAdmin} = require('../../middlewares/authenticate');

router.get('/', isAdmin , ctrl.get);
router.get('/me', authenticate, ctrl.getMyUser);
router.post('/', ctrl.post);
router.post('/login', ctrl.login);
router.post('/:id/wallets', authenticate, ctrl.postWallets);
router.post('/:id/wallets/:walletId/cards', authenticate, ctrl.postCards);
router.post('/:id/cards', authenticate, ctrl.postCards);
router.get('/:id/cards',authenticate,  ctrl.getCards);

module.exports = router;
