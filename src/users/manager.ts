import { UserModel, IDocUser } from './models'
import { save as saveModel, findModelById, list } from '../db/adapter'
import { hashPassword as hash } from './lib'

interface IUserParams {
  displayName: string
  email: string
  password: string
}

interface CreateUserOptions {
  hashPassword?(password: string): Promise<string>
  save?(obj: IDocUser): Promise<IDocUser>
}

async function createUser(
  params: IUserParams,
  options: CreateUserOptions = {},
) {
  const { hashPassword = hash, save = saveModel } = options
  const userParams: IUserParams = {
    ...params,
    password: await hashPassword(params.password),
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
