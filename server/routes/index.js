
const router = require('express').Router();

router.use('/v1', require('./v1'));
router.get('/info', info);

function info(req, res) {
  return res.json('Payment system');
}

module.exports = exports = router;
