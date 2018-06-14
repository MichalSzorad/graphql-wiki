import { findUserById, createUser } from './manager'

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        const { id } = args
        return findUserById(String(id))
      },
    },
  },
})

interface IUserParams {
  email: string
  password: string
  displayName: string
}

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        displayName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return createUser(args as IUserParams)
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
})

export default schema
