import { findUserById, createUser } from './manager'
import schema from './schema.graphql'

export const resolver = {
  Mutation: {
    addUser(parentValue: any, args: any) {
      return createUser(args)
    },
  },
  Query: {
    user(parentValue: any, args: any) {
      return findUserById(args.id)
    },
  },
}

export const typeDef = schema
