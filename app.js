const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const router = require('./routes/');
const session = require('koa-session');
const render = require('koa-ejs');
const path = require('path');
const staticFiles = require('koa-static');
const key = require('./config/keys');
require('./utils/auth');

const port = process.env.PORT || 3000;


app = new Koa();

app.keys = [key.appKey];

render(app,{
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    chache: false
});

app.use(session({}, app))
    .use(bodyParser())
	.use(passport.initialize())
    .use(passport.session())
    .use(staticFiles("."))
	.use(router.routes())
    .use(router.allowedMethods());
    
app.listen(port, () => console.log(`Server Started on port ${port}`));    


