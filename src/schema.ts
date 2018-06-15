import { UserMutation, UserQuery } from './users/schema'
import { PostMutation, PostQuery } from './posts/schema'

interface Query {
  User: UserQuery
  Post: PostQuery
}
interface Mutation {
  User: UserMutation
  Post: PostMutation
}

/** @graphql schema */
export interface Schema {
  query: Query
  mutation: Mutation
}
