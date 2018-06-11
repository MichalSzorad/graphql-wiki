import { graphql, buildSchema } from "graphql";
import express from "express";
import expressGraphQL from "express-graphql";

import schema from "./posts/schema";

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
