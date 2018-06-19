import { UserModel, IDocUser } from './models'
import {
  saveModel,
  findModelById,
  list,
  modelExists,
  findModel,
} from '../db/adapter'
import { hashPassword as hash, compatePasswords } from './lib'

interface IUserParams {
  displayName: string
  email: string
  password: string
}

interface CreateUserOptions {
  hashPassword?(password: string): Promise<string>
  save?(obj: IDocUser): Promise<IDocUser>
}

interface IUserAuthenticateParams {
  email: string
  password: string
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

async function authenticate({
  email,
  password,
}: IUserAuthenticateParams): Promise<IDocUser | null> {
  const user = await findUserByEmail(email)
  if (!user) {
    return null
  }
  const equal = await compatePasswords(password, user.password)

  return equal ? user : null
}

async function findUserByEmail(email: string): Promise<IDocUser | null> {
  const users = await findModel(UserModel, { email })
  return users[0] || null
}

function getAllUsers() {
  return list(UserModel)
}

function userExists(id: string): Promise<boolean> {
  return modelExists(UserModel, id)
}
export {
  createUser,
  findUserById,
  getAllUsers,
  userExists,
  findUserByEmail,
  authenticate,
}
