// TODO: JWT
// TODO: Passport / koa-passport using Local Strategy
import Koa from 'koa';

import { server as config } from 'settings';

// import db from './database';
import useCore from './middleware/core';
import usePassport from './middleware/passport';
import useGraphQL from './middleware/graphql';
import useStatic from './middleware/static';

const app = new Koa();
app.keys = [config.appKey];

useCore(app);
usePassport(app);
useGraphQL(app);
useStatic(app);

app.listen(config.port);

console.log(`Server running on port: ${config.port}`);
