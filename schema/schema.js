const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // data is fetched here from the db or a data store
        return axios.get(`http://localhost:3000/users/${args.id}`)
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
