import express from 'express'
import expressGraphQL from 'express-graphql'

import schema from './users/schema'
import { PORT } from './config'
import { init } from './db'
import { MONGODB_URI } from './config'
init(MONGODB_URI)
const app = express()

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
)

app.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphql'),
)
