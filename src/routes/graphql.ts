import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "../graphql/schema";
import { rootResolver } from "../graphql/resolvers";

export const graphqlRouter = Router();

graphqlRouter.all(
  "/",
  createHandler({ schema, rootValue: rootResolver })
);
