import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "../../graphql/schema";
import { prisma } from "../../database/generated/client";

const app = express();

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: () => {
    return {
      prisma
    };
  }
});

server.applyMiddleware({ app, path: "*" });

export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
