import graphqlHTTP from 'koa-graphql';
import MyGraphQLSchema from '../schema';

export default (secureRouter) => {
  secureRouter.all('/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }));
};
