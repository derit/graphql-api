const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

require("dotenv").config();

const typeDefs = require("./types");

const resolvers = require("./resolver");

const { ApolloServer } = require("apollo-server-express");

const { makeExecutableSchema } = require("graphql-tools");


const { Initdb } = require("./db");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,

  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

Initdb().then((client) => {
  const db = client.db("testing");

  const server = new ApolloServer({
    schema,
    onHealthCheck: () => {
      return new Promise((resolve, reject) => {
        // Replace the `true` in this conditional with more specific checks!
        if (is_true) {
          resolve();
        } else {
          reject();
        }
      });
    },
    dataSources: () => {
      return {
        db: db,
      };
    },
    context: ({ req, res }) => ({ req, res }),

    formatError(err) {
      return {
        message: err.message,
        code: err.originalError && err.originalError.code,
      };
    },
  });

  app.post("/graphql");

  server.applyMiddleware({
    app: app,
    path: "/graphql",
    cors: false,
  });
});

module.exports = app;
