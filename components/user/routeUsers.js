const express = require('express');
const router = express.Router();

const controller = require('./controllerUsers');

router.post('/signup', controller.signup);

module.exports = router;
