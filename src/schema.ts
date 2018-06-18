import { UserMutation, UserQuery } from './users/schema'
import { PostMutation, PostQuery, PostSubscription } from './posts/schema'
import { CommentMutation, CommentQuery } from './comments/schema'

interface Query extends UserQuery, PostQuery, CommentQuery {}
interface Mutation extends UserMutation, PostMutation, CommentMutation {}
interface Subscription extends PostSubscription {}

/** @graphql schema */
export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
