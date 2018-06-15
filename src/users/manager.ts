import { UserModel } from './models'
import { save, findModelById, list } from '../db/adapter'

interface IUserParams {
  displayName: string
  email: string
  password: string
}

function createUser(params: IUserParams) {
  return save(new UserModel(params))
}

function findUserById(id: string) {
  return findModelById(UserModel, id)
}

function getAllUsers() {
  return list(UserModel)
}
export { createUser, findUserById, getAllUsers }
