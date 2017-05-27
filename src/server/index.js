// TODO: JWT
// TODO: Passport / koa-passport using Local Strategy
import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import serve from 'koa-static';
import Router from 'koa-router';
import cors from 'kcors';
import graphqlHTTP from 'koa-graphql';

import './auth';
import MyGraphQLSchema from './schema';

const port = 3000;

const app = new Koa();

const router = new Router();
app.use(bodyParser());

app.use(cors({
  origin: '*',
}));

// Authentication
app.keys = ['your-session-secret'];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

// Routes
router.all('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
}));

app.use(router.routes()).use(router.allowedMethods());

app.use(serve('dist/web'));

const readFileThunk = src => new Promise((resolve, reject) => {
  fs.readFile(src, { encoding: 'utf-8' }, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});


// Return the client
app.use(async (ctx, next) => {
  const src = path.join(path.resolve('.'), 'dist/web/index.html');

  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = await readFileThunk(src);
});



app.listen(port);

console.log(`Server running on port: ${port}`);
