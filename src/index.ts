import express from 'express'
import { createServer, Server } from 'http'

import { PORT, WS_PORT } from './config'
import { init } from './db'
import { MONGODB_URI } from './config'

import setupGraphQLServer from './graphql'

import './event-listeners'

init(MONGODB_URI)
const app = express()
const wsServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

setupGraphQLServer(app, wsServer, `ws://localhost:${WS_PORT}`, '/subscriptions')

app.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphiql'),
)
wsServer.listen(WS_PORT, () => console.log(`WS listening on ${WS_PORT}`))
