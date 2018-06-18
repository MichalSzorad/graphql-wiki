import { UserModel } from './models'
import { save, findModelById, list } from '../db/adapter'
import { hashPassword } from './lib'

interface IUserParams {
  displayName: string
  email: string
  password: string
}

async function createUser(params: IUserParams, { hash = hashPassword } = {}) {
  const userParams: IUserParams = {
    ...params,
    password: await hash(params.password),
  }

  return await save(new UserModel(userParams))
}

function findUserById(id: string) {
  return findModelById(UserModel, id)
}

function getAllUsers() {
  return list(UserModel)
}
export { createUser, findUserById, getAllUsers }
