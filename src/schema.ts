import { UserMutation, UserQuery } from './users/schema'
import { PostMutation, PostQuery } from './posts/schema'

import { CommentMutation, CommentQuery } from './comments/schema'

interface Query extends UserQuery, PostQuery, CommentQuery {}
interface Mutation extends UserMutation, PostMutation, CommentMutation {}

/** @graphql schema */
export interface Schema {
  query: Query
  mutation: Mutation
}
