const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/wallets', require('./wallets'));

module.exports = exports = router;
