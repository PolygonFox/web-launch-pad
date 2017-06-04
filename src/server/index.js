// TODO: JWT
// TODO: Passport / koa-passport using Local Strategy
import Koa from 'koa';

import config from './config';
// import db from './database';
import useCore from './middleware/core';
import useGraphQL from './middleware/graphql';
import usePassport from './middleware/passport';
import useStatic from './middleware/static';

const port = 3000;
const app = new Koa();
app.keys = [config.appKey];

useCore(app);
useGraphQL(app);
usePassport(app);
useStatic(app);

app.listen(port);

console.log(`Server running on port: ${port}`);
