import Koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';

import MyGraphQLSchema from './schema';

const port = 3000;

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
}));

app.use(serve('dist/web'));
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);

console.log(`Server running on port: ${port}`);