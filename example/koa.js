/* eslint-disable no-console */

const path = require('node:path');
const { promisify } = require('node:util');

const Koa = require('koa');
const render = require('@koa/ejs');
const helmet = require('helmet');
const mount = require('koa-mount');

const { Provider } = require('../lib/index.js'); // require('oidc-provider');

const Account = require('./support/account.js');
const configuration = require('./support/configuration.js');
const routes = require('./routes/koa.js');

const { PORT = 3000, ISSUER = `http://localhost:${PORT}` } = process.env;
configuration.findAccount = Account.findAccount;

const app = new Koa();

const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
delete directives['form-action'];
const pHelmet = promisify(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives,
  },
}));

app.use(async (ctx, next) => {
  const origSecure = ctx.req.secure;
  ctx.req.secure = ctx.request.secure;
  await pHelmet(ctx.req, ctx.res);
  ctx.req.secure = origSecure;
  return next();
});

render(app, {
  cache: false,
  viewExt: 'ejs',
  layout: '_layout',
  root: path.join(__dirname, 'views'),
});

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;

  app.use(async (ctx, next) => {
    if (ctx.secure) {
      await next();
    } else if (ctx.method === 'GET' || ctx.method === 'HEAD') {
      ctx.status = 303;
      ctx.redirect(ctx.href.replace(/^http:\/\//i, 'https://'));
    } else {
      ctx.body = {
        error: 'invalid_request',
        error_description: 'do yourself a favor and only use https',
      };
      ctx.status = 400;
    }
  });
}

let server;
(async () => {
  let adapter;
  if (process.env.MONGODB_URI) {
    adapter = require('./adapters/mongodb.js'); // eslint-disable-line global-require
    await adapter.connect();
  }

  const provider = new Provider(ISSUER, { adapter, ...configuration });

  app.use(routes(provider).routes());
  app.use(mount(provider.app));
  server = app.listen(PORT, () => {
    console.log(`application is listening on port ${PORT}, check its /.well-known/openid-configuration`);
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});
