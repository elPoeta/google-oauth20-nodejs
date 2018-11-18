const Router = require('koa-router');
const {authenticated} = require('../utils');


const saltRounds = 12;

const router = new Router();

router.get('/', authenticated(), async (ctx)=>{
    await ctx.render('user', {
        user : ctx.state.user
    })
});


router.get('/private/authenticated', authenticated(), async (ctx, next) => {
	ctx.body = { msg: 'Authenticated', user: ctx.state.user };
});


router.get('/permitido', ctx=>{
    ctx.body = '@permitido!!!!';
})
module.exports = router;