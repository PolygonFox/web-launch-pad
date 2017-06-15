// TODO: JWT
// TODO: Passport / koa-passport using Local Strategy
import Koa from 'koa';
import Router from 'koa-router';

import https from 'https';
import fs from 'fs';

import { server as config } from 'settings';

import authentication from './middleware/auth';
import useCore from './middleware/core';
import usePassport from './middleware/passport';
import useGraphQL from './middleware/graphql';
import useStatic from './middleware/static';

const app = new Koa();
app.keys = [config.appKey];

// Routers
const publicRouter = new Router();
const secureRouter = new Router();
secureRouter.use(authentication);

useCore(app);
usePassport(app, publicRouter);
useGraphQL(secureRouter);
useStatic(app);

app.use(publicRouter.routes());
app.use(secureRouter.routes());

if (config.SSL.enabled) {
  https.createServer({
    key: fs.readFileSync(config.SSL.keyPath),
    cert: fs.readFileSync(config.SSL.certPath),
  }, app.callback()).listen(config.SSL.port);
}

app.listen(config.port);

console.log(`Server running on port: ${config.port}`);
