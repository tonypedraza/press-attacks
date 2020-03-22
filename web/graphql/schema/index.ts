import { prisma } from "../../database/generated/client";
import datamodelInfo from "../../database/generated/nexus-prisma";
import { prismaObjectType, makePrismaSchema } from "nexus-prisma";
const path = require("path");

// @ts-ignore
const Country = prismaObjectType({
  name: "Country",
  description: "Country in which Journalists were killed",
  definition(t) {
    t.prismaFields([
      "id",
      "name",
      {
        name: "journalistsKilled",
        args: []
      }
    ]);
    t.int("numJournalists", {
      description: "Number of journalists killed in this country",
      resolve: async ({ id }, {}, { prisma }) => {
        const journalists = await prisma.journalists({
          where: { country: { id } }
        });
        return journalists.length;
      }
    });
  }
});

const Query = prismaObjectType({
  name: "Query",
  definition(t) {
    t.prismaFields(["*"]);
  }
});

const Mutation = prismaObjectType({
  name: "Mutation",
  definition: t => t.prismaFields(["*"])
});

const outputs = process.env.GENERATE
  ? {
      schema: path.join(__dirname, "../schema.generated.graphql"),
      typegen: path.join(__dirname, "../nexus-schema-types.generated.ts")
    }
  : {
      schema: false,
      typegen: false
    };

const schema = makePrismaSchema({
  types: [Query, Country, Mutation],
  prisma: {
    datamodelInfo,
    client: prisma
  },
  outputs,
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, "../../types/graphql.ts"),
        alias: "types"
      }
    ],
    contextType: "types.Context"
  }
});

export default schema;
