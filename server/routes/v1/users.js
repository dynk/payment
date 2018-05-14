const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const {authenticate} = require('../../middlewares/authenticate');

router.get('/', ctrl.get);
router.get('/me', authenticate, ctrl.getMyUser);
router.post('/', ctrl.post);
router.post('/login', ctrl.login);

module.exports = router;
