const Router = require('koa-router');
const users = require('./users');
const home = require('./home');

const router = new Router();


router.use('/user', users.routes());
router.use('/', home.routes());

module.exports = router;