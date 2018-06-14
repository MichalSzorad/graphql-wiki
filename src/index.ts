import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { resolver } from './users/schema'
import { PORT } from './config'
import { init } from './db'
import { MONGODB_URI } from './config'

init(MONGODB_URI)
const app = express()

const Schema = makeExecutableSchema<void>({
  resolvers: [resolver],
  typeDefs: [],
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: Schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) // if you want GraphiQL enabled

app.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphiql'),
)
