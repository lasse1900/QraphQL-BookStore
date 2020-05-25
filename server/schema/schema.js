const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    pages: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// dummy data
var books = [
  { name: 'Name of the wind', genre: 'Fantasy', page: 504, id: '1' },
  { name: 'Howto play ball', genre: 'Sports', pages: 200, id: '2' },
  { name: 'Eleanor Roosevelt\'s time', genre: 'Histore', pages: 195, id: '3' },
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});