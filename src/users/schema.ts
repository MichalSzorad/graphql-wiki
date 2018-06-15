import { findUserById, createUser, getAllUsers } from './manager'
import { IUser } from './models'

interface AddUserParams {
  email: string
  password: string
  displayName: string
}

interface IdParam {
  id: string
}

export interface UserMutation {
  addUser(args: AddUserParams): IUser
}

export interface UserQuery {
  user(args: IdParam): IUser
  users: IUser[]
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
    users() {
      return getAllUsers()
    },
  },
}
