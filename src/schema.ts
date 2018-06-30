import { UserMutation, UserQuery } from './users/schema'
import { PostMutation, PostQuery, PostSubscription } from './posts/schema'
import {
  CommentMutation,
  CommentQuery,
  CommentSubscription,
} from './comments/schema'

interface Query extends UserQuery, PostQuery, CommentQuery {}
interface Mutation extends UserMutation, PostMutation, CommentMutation {}
interface Subscription extends PostSubscription, CommentSubscription {}

/** @graphql schema */
export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
