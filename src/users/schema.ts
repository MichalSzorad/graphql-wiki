import { findUserById, createUser, getAllUsers } from './manager'
import { IUser } from './models'

interface AddUserParams {
  displayName: string
  email: string
  password: string
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

// function check<T, K extends keyof T>(obj: T, anotherObj: K) {
//   return 4
// }

// type SomeFun<A, B> = (a: A) => B

// type FunctionMap<T> = { [P in keyof T]: (a: any) => any }

// type Abc<T extends FunctionMap<T>> = { [P in keyof T]: T[P] }

// type Bcd<T> = { [P in keyof T]: (a: any) => any }

// const a: Abc<UserMutation> = {
//   addUser: a => {
//     return null
//   },
//   test: a => {
//     return a.id
//   },
// }

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
