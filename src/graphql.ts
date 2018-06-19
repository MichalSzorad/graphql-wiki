import { makeExecutableSchema } from 'graphql-tools'
import express, { Router } from 'express'
import { execute, subscribe } from 'graphql'
import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { formatError } from 'apollo-errors'

import { generateContext } from './gql-context'
import { resolver as userResolver } from './users/schema'
import { resolver as postResolver } from './posts/schema'
import { resolver as commentResolver } from './comments/schema'
import { Server } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'

function readSchemaFile(filename: string): string {
  return fs.readFileSync(path.resolve(__dirname, filename)).toString()
}

// generated file will be located only in the dist folder
const schemaString = readSchemaFile('schema.graphql')
const schema = makeExecutableSchema({
  resolvers: [userResolver, postResolver, commentResolver],
  typeDefs: [schemaString],
})

function setup(app: Router, server: Server) {
  // express app
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({
      schema,
      formatError,
      context: generateContext(req),
    })),
  )
  app.get(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: 'ws://localhost:4000/subscription',
    }),
  )

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: '/subscription',
    },
  )
}
export { schema }
export default setup
