import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import ship from './pirates/ship';

const rootSchema = [`

  type User {
    username: String
  }

  type Query {
    test: String
    ship(
      name: String
    ): Ship
    ships: [Ship]
  }

  type Mutation {
    createShip(params: CreateShipInput): Ship
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

const rootResolvers = {
  Query: {
    test() {
      return 'Hello World!';
    },
  },
};

const schema = [...rootSchema, ...ship.schema];
const resolvers = merge(rootResolvers, ship.resolvers);

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
