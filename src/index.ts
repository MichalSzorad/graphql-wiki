import express from 'express'
import { createServer } from 'http'

import { PORT } from './config'
import { init } from './db'
import { MONGODB_URI } from './config'

import setupGraphQLServer from './graphql'

import './event-listeners'

init(MONGODB_URI)
const app = express()
const server = createServer(app)

setupGraphQLServer(app, server)

server.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphiql'),
)
