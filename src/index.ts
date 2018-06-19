import express from 'express'
import { createServer } from 'http'
import session from 'express-session'
import passport from 'passport'
import bodyParser from 'body-parser'

import { PORT, WS_PORT } from './config'
import { init } from './db'
import { MONGODB_URI, SESSION_SECRET } from './config'
import setupGraphQLServer from './graphql'
import './event-listeners'
import { findUserById } from './users/manager'
import setupPassport from './passport/setup'

// setup passport
setupPassport(passport, {
  findUser: findUserById,
})

// setup db
init(MONGODB_URI)

// setup servers
const app = express()
const wsServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

// apply middleware
app.use(
  session({
    secret: SESSION_SECRET,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.post(
  '/auth/login',
  bodyParser.urlencoded({ extended: true }),
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
)

setupGraphQLServer(app, wsServer, `ws://localhost:${WS_PORT}`, '/subscriptions')

// start servers
app.listen(PORT, () =>
  console.log('Now browse to localhost:' + PORT + '/graphiql'),
)
wsServer.listen(WS_PORT, () => console.log(`WS listening on ${WS_PORT}`))
