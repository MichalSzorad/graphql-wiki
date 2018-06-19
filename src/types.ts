import { IDocUser } from './users/models'

export interface GraphQLContext {
  authenticated: boolean
  ipAddress: string
  user?: IDocUser
}
