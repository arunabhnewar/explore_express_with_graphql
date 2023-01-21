// Dependencies
const express = require("express");
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const users = require("./user");
const posts = require('./posts');


// App initialize
const app = express();



//User Type declear
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Single User",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})


// Post Type Declare
const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Users Posts",
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    body: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})



// Root query
const RootQueryType = new GraphQLObjectType({
  name: "Jamboo",
  description: "Baby",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return users;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return posts;
      }
    }
  }),
});



// Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
});



// Express Graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);



// App Listen
app.listen(3000, () => {
  console.log("fucking js running on port 3000");
});
