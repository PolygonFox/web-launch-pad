import graphqlHTTP from 'koa-graphql';
import route from 'koa-route';
import MyGraphQLSchema from '../schema';

export default (app) => {
  app.use(route.all('/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })));
};
