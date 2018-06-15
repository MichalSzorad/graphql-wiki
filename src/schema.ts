import { UserMutation, UserQuery } from './users/schema'
import { PostMutation, PostQuery } from './posts/schema'

interface Query extends UserQuery, PostQuery {}
interface Mutation extends UserMutation, PostMutation {}

/** @graphql schema */
export interface Schema {
  query: Query
  mutation: Mutation
}
