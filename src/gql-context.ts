import { GraphQLContext } from './types'
import { Request } from 'express'
import { IDocUser } from './users/models'

function generateContext(req: Request): GraphQLContext {
  const ipAddress = String(req.connection.remoteAddress)
  const user = <IDocUser>req.user || null
  const authenticated = !!user
  return { ipAddress, authenticated, user }
}

export { generateContext }
