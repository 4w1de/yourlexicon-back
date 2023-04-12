const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/login', controller.login);
router.get('/auth', auth, controller.authorizate);
//router.post('/signin', controller.signin);
router.post('/signup', controller.signup);
router.post('/confirm', controller.confirm);
router.post('/reset-password-email', controller.resetPasswordEmail);
//router.post('/reset-password', controller.resetPassword);

module.exports = router;
