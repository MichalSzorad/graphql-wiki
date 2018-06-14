import { UserModel } from './models'
import { save, findModel, findModelById } from '../db/adapter'

interface IUserParams {
  email: string
  password: string
  displayName: string
}

function createUser(params: IUserParams) {
  return save(new UserModel(params))
}

function findUserById(id: string) {
  return findModelById(UserModel, id)
}

export { createUser, findUserById }
