import { UserModel } from './models'
import { save } from '../db/adapter'

interface IUserParams {
  email: string
  password: string
  displayName: string
}

function createUser(params: IUserParams) {
  return save(new UserModel(params))
}

export { createUser }
