// TODO: JWT
// TODO: Passport / koa-passport using Local Strategy
import Koa from 'koa';
import Router from 'koa-router';

import { server as config } from 'settings';

// import db from './database';
import authentication from './middleware/auth';
import useCore from './middleware/core';
import usePassport from './middleware/passport';
import useGraphQL from './middleware/graphql';
import useStatic from './middleware/static';
import authenticateController from './controllers/authenticate-controller';

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


app.listen(config.port);

console.log(`Server running on port: ${config.port}`);
