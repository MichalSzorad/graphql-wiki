import { GraphQLContext } from './types'

function generateContext(req: any): GraphQLContext {
  const ipAddress = String(req.connection.remoteAddress)
  const user = req.user || null
  const authenticated = !!user
  return { ipAddress, authenticated, user }
}

export { generateContext }
