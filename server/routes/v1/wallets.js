const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/wallets');
const { isAdmin } = require('../../middlewares/authenticate');

router.get('/', isAdmin , ctrl.get);
router.delete('/:id', isAdmin, ctrl.destroy);


module.exports = router;
