import express from 'express'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { execute, subscribe } from 'graphql'
import { formatError } from 'apollo-errors'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { resolver as userResolver } from './users/schema'
import { resolver as postResolver } from './posts/schema'
import { resolver as commentResolver } from './comments/schema'

import { PORT, WS_PORT } from './config'
import { init } from './db'
import { MONGODB_URI } from './config'
import fs from 'fs'
import path from 'path'

import './event-listeners'
import { generateContext } from './gql-context'

// generated file will be located only in the dist folder
const schema = fs
  .readFileSync(path.resolve(__dirname, 'schema.graphql'))
  .toString()

init(MONGODB_URI)
const app = express()

const Schema = makeExecutableSchema({
  resolvers: [userResolver, postResolver, commentResolver],
  typeDefs: [schema],
})

// express app
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema: Schema,
    formatError,
    context: generateContext(req),
  })),
)
app.get(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${WS_PORT}/graphql`,
  }),
)

app.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphiql'),
)

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

websocketServer.listen(WS_PORT, () =>
  console.log(`ws server is listening on ${WS_PORT}`),
)
SubscriptionServer.create(
  {
    execute,
    subscribe,
    schema: Schema,
  },
  {
    server: websocketServer,
    path: '/graphql',
  },
)
