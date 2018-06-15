import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { resolver as userResolver } from './users/schema'
import { resolver as postResolver } from './posts/schema'
import { resolver as commentResolver } from './comments/schema'
import { PORT } from './config'
import { init } from './db'
import { MONGODB_URI } from './config'
import fs from 'fs'
import path from 'path'

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

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: Schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) // if you want GraphiQL enabled

app.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphiql'),
)
