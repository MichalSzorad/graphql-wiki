import { findUserById, createUser } from './manager'
import { IUser } from './models'

interface AddUserParams {
  email: string
  password: string
  displayName: string
}

interface IdParam {
  id: string
}

export interface Mutation {
  addUser(args: AddUserParams): IUser
}

export interface Query {
  user(args: IdParam): IUser
}

export const resolver = {
  Mutation: {
    addUser(parentValue: any, args: any) {
      return createUser(args)
    },
  },
  Query: {
    user(parentValue: any, args: any): Promise<IUser | null> {
      return findUserById(args.id)
    },
  },
}
