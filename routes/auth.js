const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/login', controller.login);
router.get('/auth', auth, controller.authorizate);

module.exports = router;
