import * as GraphQLTypes from "../graphql/schema-types.generated";

export type Country = { __typename?: "Country" } & Pick<
  GraphQLTypes.Country,
  "id" | "name"
>;

export type Journalist = { __typename?: "Journalist" | undefined } & Pick<
  GraphQLTypes.Journalist,
  | "id"
  | "body"
  | "fullName"
  | "year"
  | "startDate"
  | "location"
  | "organizations"
>;
