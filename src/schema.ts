import { MutationRoot, QueryRoot } from './users/schema'

// Don't forget to declare your schema and the root types!
/** @graphql schema */
export interface Schema {
  query: QueryRoot
  mutation: MutationRoot
}
