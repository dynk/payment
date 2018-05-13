const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');


router.get('/', ctrl.get);
router.post('/', ctrl.post);

module.exports = router;
