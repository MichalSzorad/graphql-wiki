import express from 'express'
import expressGraphQL from 'express-graphql'

import schema from './posts/schema'
import { PORT } from './config'

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
