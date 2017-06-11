import Ship from '../../models/ship';

const schema = [`

  type Ship {
    name: String!
    strength: Int!
  }

  input CreateShipInput {
    name: String
  }
`];

const resolvers = {
  Query: {
    ship(_, args, context) {
      console.log(_, args);
      return { name: 'Name of the ship!' };
    },
    ships(_, args) {
      return [{
        name: 'Ship A',
        strength: 4,
      }, {
        name: 'Ship B',
        strength: 2,
      }];
    },
  },

  Mutation: {
    createShip(_, args) {
      const newShip = new Ship();
      newShip.name = args.params.name;
      newShip.save();
      return newShip;
    },
  },
};

export default {
  schema,
  resolvers,
};
