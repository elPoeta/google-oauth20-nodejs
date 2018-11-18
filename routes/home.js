const Router = require('koa-router');
const passport = require('koa-passport');
const {authenticated} = require('../utils');
require('../utils/auth');
const router = new Router();

router.get('/', async (ctx) =>{
    await ctx.render('index',{
      user: ctx.state.user || null
    });
  
});
router.get('auth',ctx=>{
    ctx.body='<h1>AUTH20 PAGE</h1>';
});
router.get('auth/google',
passport.authenticate('google',{ scope: ['profile', 'email']}));


router.get('auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/user',
    failureRedirect: '/'
  })
);

router.get('private', authenticated(), async ctx =>{
  await ctx.render('restrictedarea');
});

router.get('public', async ctx =>{
  await ctx.render('publicarea',{
    user: ctx.state.user || null
  });
});

router.get('logout', (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});
module.exports = router;