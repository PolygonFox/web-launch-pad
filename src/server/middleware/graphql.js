import graphqlHTTP from 'koa-graphql';
import route from 'koa-route';
import passport from 'koa-passport';
import MyGraphQLSchema from '../schema';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default (app) => {
  app.use(route.all('/graphql', (ctx, next) => {
    console.log(ctx.isAuthenticated());
  }));
};
