const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/words');

router.get(
    '/all',
    /*passport.authenticate('passportEditor', { session: false }),*/
    controller.getAll,
);
router.get('/random', controller.getRandom);
/*router.get(
    '/:id',
    passport.authenticate('passportEditor', { session: false }),
    controller.getById,
);
router.delete(
    '/:id',
    passport.authenticate('passportAdmin', { session: false }),
    controller.deleteById,
);
router.patch(
    '/:id',
    passport.authenticate('passportEditor', { session: false }),
    controller.updateById,
);
router.post(
    '/add',
    passport.authenticate('passportEditor', { session: false }),
    controller.add,
);*/

module.exports = router;
